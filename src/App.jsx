import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign-up/SignUp";
import Places from "./pages/places/Places";
import PlaceDetails from "./pages/place-details/PlaceDetails";
import UserProfile from "./pages/user-profile/UserProfile";
import Contact from "./pages/contact/Contact";
import NotFound from "./pages/not-found/NotFound";
import AboutUs from "./pages/AboutUs/AboutUs";
import Checkout from "./pages/checkout/Checkout"; 
import { ThemeProvider } from "./hooks/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminApp from "./admin/AdminApp";
import AdminRoute from "./admin/AdminRoute";

const AppContent = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <div className="bg-white dark:bg-gray-700 min-h-screen transition-colors duration-300">
      {!isAdminPath && <Header key={isLoggedIn ? "logged-in" : "logged-out"} />}

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/places" element={<Places />} />
        <Route path="/place-details/:id" element={<PlaceDetails />} />

        <Route
          path="/user/1"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminApp />
            </AdminRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminPath && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;


