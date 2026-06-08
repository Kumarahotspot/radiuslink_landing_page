import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { LanguageProvider } from "./i18n";
import { ThemeProvider } from "./theme";
import LandingPage from "./pages/LandingPage";
import { AdminAuthProvider } from "./admin/AuthContext";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import PackagesAdmin from "./admin/sections/PackagesAdmin";
import SubscriptionsAdmin from "./admin/sections/SubscriptionsAdmin";
import ContactsAdmin from "./admin/sections/ContactsAdmin";
import CoverageAdmin from "./admin/sections/CoverageAdmin";
import UsersAdmin from "./admin/sections/UsersAdmin";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AdminAuthProvider>
          <div className="App">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="packages" element={<PackagesAdmin />} />
                  <Route path="subscriptions" element={<SubscriptionsAdmin />} />
                  <Route path="contacts" element={<ContactsAdmin />} />
                  <Route path="coverage" element={<CoverageAdmin />} />
                  <Route path="users" element={<UsersAdmin />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
            <Toaster
              position="bottom-right"
              toastOptions={{
                classNames: {
                  toast: "bg-card border-border text-foreground",
                  description: "text-muted-foreground"
                }
              }}
            />
          </div>
        </AdminAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
