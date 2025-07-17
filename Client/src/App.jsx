import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";
import Navbar from "./layout/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ReportsPage from "./pages/Reports";
import AdminPage from "./pages/AdminPage";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <header>
          <Navbar />
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={["viewer", "reviewer", "admin"]}>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/r" element={<ReportsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Admin route protected */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </ThemeProvider>
    </div>
  );
}
