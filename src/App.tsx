import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { HowItWorks } from "./pages/HowItWorks";
import { Tutorials } from "./pages/Tutorials";
import { Volunteer } from "./pages/Volunteer";
import { Contact } from "./pages/Contact";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Places from "./pages/admin/Places";
import Requests from "./pages/admin/Requests";
import TutorialsAdmin from "./pages/admin/Tutorials";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import Notifications from "./pages/admin/Notifications";
import Accounts from "./pages/admin/Accounts";

// Auth
import { AuthProvider } from "./components/admin/AuthContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Header />}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/places" element={
            <ProtectedRoute>
              <Places />
            </ProtectedRoute>
          } />
          <Route path="/admin/requests" element={
            <ProtectedRoute>
              <Requests />
            </ProtectedRoute>
          } />
          <Route path="/admin/tutorials" element={
            <ProtectedRoute>
              <TutorialsAdmin />
            </ProtectedRoute>
          } />
          <Route path="/admin/reports" element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/admin/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
          <Route path="/admin/accounts" element={
            <ProtectedRoute>
              <Accounts />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
