import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const PaymentProcessing = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <DotLottieReact
        src="https://lottie.host/d8c7f93b-58bf-4bdb-8ecb-07e153882885/Zkx3Xbhx2R.lottie"
        loop
        className="w-full h-full"
        autoplay
      />
      <p>Ödeme işlemi gerçekleştiriliyor...</p>
    </div>
  );
};

export default PaymentProcessing;