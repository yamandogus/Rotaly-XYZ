import { toast } from "react-hot-toast";
import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { setUser } from "@/store/auth/auth-slice";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch } from "redux";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginLogicProps {
  router: AppRouterInstance;
  dispatch: Dispatch;
  loginSuccess: (userType: 'user' | 'hotel' | 'admin' | 'support') => void;
  setOpen: (open: boolean) => void;
}

export const createLoginLogic = ({
  router,
  dispatch,
  loginSuccess,
  setOpen,
}: LoginLogicProps) => {
  const handleLogin = async (data: LoginFormData) => {
    console.log("login data", data);

    try {
      // Önce API ile login dene
      const response = await authService.login(data);
      console.log("login response", response);

      if (response.success) {
        const userResponse = await userService.getUserProfile();
        console.log("user response", userResponse);

        if (userResponse.data.isVerified === false) {
          setOpen(true);
        } else {
          handleUserRedirection(userResponse.data, router, dispatch, loginSuccess);
        }
      } else {
        toast.error("Hatalı kullanıcı adı veya şifre.");
      }
    } catch (error) {
      console.error("API login error:", error);
      toast.error("Hatalı kullanıcı adı veya şifre.");
    }
  };

  const handleOtpSubmit = async (otp: string, onClose: () => void) => {
    if (otp.length !== 6) {
      toast.error("Doğrulama kodu 6 haneli olmalıdır.");
      onClose();
      localStorage.removeItem("endTime");
      return;
    }

    const response = await authService.verifyEmail(otp);
    console.log("verify email response", response);

    if (response.success) {
      toast.success("Hesabınız doğrulandı.");
      localStorage.removeItem("endTime");
      // Doğrulama başarılı olduğunda kullanıcıyı yönlendir
      const userResponse = await userService.getUserProfile();
      if (userResponse.data.isVerified) {
        handleUserRedirection(userResponse.data, router, dispatch, loginSuccess);
      }
    } else {
      toast.error("Doğrulama kodu geçersiz.");
    }

    onClose();
  };

  return { handleLogin, handleOtpSubmit };
};

// Kullanıcıyı role göre yönlendirme
const handleUserRedirection = (
  userData: User,
  router: AppRouterInstance,
  dispatch: Dispatch,
  loginSuccess: (userType: 'user' | 'hotel' | 'admin' | 'support') => void
) => {
  switch (userData.role) {
    case "ADMIN":
      localStorage.setItem("userRole", "admin");
      loginSuccess("admin");
      dispatch(setUser(userData));
      router.push("/dashboard/admin");
      break;
    case "OWNER":
      localStorage.setItem("userRole", "hotel");
      loginSuccess("hotel");
      dispatch(setUser(userData));
      router.push("/dashboard/hotel");
      break;
    case "SUPPORT":
      localStorage.setItem("userRole", "support");
      loginSuccess("support");
      dispatch(setUser(userData));
      router.push("/dashboard/support");
      break;
    case "CUSTOMER":
      localStorage.setItem("userRole", "user");
      loginSuccess("user");
      dispatch(setUser(userData));
      router.push("/");
      break;
    default:
      router.push("/");
  }
};

