import ProfilePage from "@/components/auth/profile/page";
import ProtectedRoute from "@/components/ui/ProtectedRoute";

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  );
}