import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign-up/SignUp";
import Places from "./pages/places/Places";
import PlaceDetails from "./pages/place-details/PlaceDetails";
import UserProfile from "./pages/user-profile/UserProfile";
import NotFound from "./pages/not-found/NotFound";

const App = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/places/" element={<Places />} />
        <Route path="/place-details/:id" element={<PlaceDetails />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
