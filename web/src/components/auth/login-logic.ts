import { toast } from "react-hot-toast";
import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { setUser } from "@/store/auth/auth-slice";
import { setUserRole } from "@/store/testUser/test-user-slice";
import { testUsers } from "./test-users";
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
  loginError: () => void;
  setOpen: (open: boolean) => void;
}

export const createLoginLogic = ({
  router,
  dispatch,
  loginSuccess,
  loginError,
  setOpen,
}: LoginLogicProps) => {
  const handleLogin = async (data: LoginFormData) => {
    console.log("login data", data);

    try {
      // Önce API ile login dene
      const response = await authService.login(data);
      console.log("login response", response);

      if (response.success) {
        // API login başarılı - kullanıcı profilini al
        const userResponse = await userService.getUserProfile();
        console.log("user response", userResponse);

        if (userResponse.data.isVerified === false) {
          setOpen(true);
        } else {
          // Kullanıcı doğrulanmış - role göre yönlendir
          handleUserRedirection(userResponse.data, router, dispatch, loginSuccess);
        }
      } else {
        // API login başarısız - test kullanıcılarını kontrol et
        handleTestUserLogin(data, router, dispatch, loginSuccess, loginError);
      }
    } catch (error) {
      console.error("API login error:", error);
      // API hatası - test kullanıcılarını kontrol et
      handleTestUserLogin(data, router, dispatch, loginSuccess, loginError);
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

// Test kullanıcıları için login
const handleTestUserLogin = (
  data: LoginFormData,
  router: AppRouterInstance,
  dispatch: Dispatch,
  loginSuccess: (userType: 'user' | 'hotel' | 'admin' | 'support') => void,
  loginError: () => void
) => {
  // Normal kullanıcı girişi
  if (data.email === testUsers.user.email && data.password === testUsers.user.password) {
    localStorage.setItem("userRole", "user");
    dispatch(setUserRole(testUsers.user.role));
    loginSuccess("user");
    router.push("/");
  }
  // Otel girişi
  else if (
    data.email === testUsers.hotel.email &&
    data.password === testUsers.hotel.password
  ) {
    localStorage.setItem("userRole", "hotel");
    dispatch(setUserRole(testUsers.hotel.role));
    loginSuccess("hotel");
    router.push("/dashboard");
  }
  // Admin girişi
  else if (
    data.email === testUsers.admin.email &&
    data.password === testUsers.admin.password
  ) {
    localStorage.setItem("userRole", "admin");
    dispatch(setUserRole(testUsers.admin.role));
    loginSuccess("admin");
    router.push("/dashboard");
  }
  // Support girişi
  else if (
    data.email === testUsers.support.email &&
    data.password === testUsers.support.password
  ) {
    localStorage.setItem("userRole", "support");
    dispatch(setUserRole(testUsers.support.role));
    loginSuccess("support");
    router.push("/dashboard/support");
  }
  // Hatalı giriş
  else {
    loginError();
  }
};
