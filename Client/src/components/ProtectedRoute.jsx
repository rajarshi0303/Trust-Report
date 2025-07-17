import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, fetchUser, loading } = useAuthStore();

  useEffect(() => {
    // Only fetch once at mount if user is null and loading is true

    fetchUser();
  }, []);

  // Still loading user session from server
  if (loading) {
    return <div>Loading...</div>;
  }

  // Session invalid or not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based protection
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
