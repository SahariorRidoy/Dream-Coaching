import ProfileEditPage from "@/components/auth/profile/edit/page";
import ProtectedRoute from "@/components/ui/ProtectedRoute";

export default function EditProfile() {
  return (
    <ProtectedRoute>
      <ProfileEditPage />
    </ProtectedRoute>
  );
}