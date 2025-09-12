import { Suspense } from "react";
import VerifyOTPPage from "@/components/auth/verify-otp/page";

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPPage />
    </Suspense>
  );
}