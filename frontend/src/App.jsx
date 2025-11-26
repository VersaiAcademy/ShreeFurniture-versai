import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Productpage from "./pages/Productpage";
import CategoryPage from "./pages/CategoryPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Whislist from "./pages/Whislist";
import DetaileProduct from "./pages/DetaileProduct";
import UserProfile from "./pages/UserProfile";
import OAuthCallback from "./pages/OAuthCallback";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Checkout from "./pages/Checkout";
import Detailedorder from "./pages/Detailedorder";
import Contactus from "./pages/Contactus";
import AboutUs from "./pages/aboutus";
import TermsConditions from "./pages/TermsConditions";
import CancellationRefundPolicy from "./pages/CancellationRefundPolicy";
import HelpPage from "./pages/HelpPage";
import SecurityPrivacyPage from "./pages/SecurityPrivacyPage";
import DeliveryShippingPage from "./pages/DeliveryShippingPage";
import CashfreeCallback from './pages/CashfreeCallback';
import CheckoutSuccess from './pages/CheckoutSuccess';
import WhatsAppWidget from './components/WhatsAppWidget';
import CustomFurniture from './pages/CustomFurniture';
import BulkOrder from "./pages/bulkorder";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer 
        position="top-center" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="dark" 
        transition={Flip} 
      />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        <Route path="/wishlist" element={<Whislist />} />
  <Route path="/dtproduct/:id" element={<DetaileProduct />} />
  <Route path="/detaileproduct/:id" element={<DetaileProduct />} />
        <Route path="/userprofile" element={<UserProfile />} />
        {/* Alias /profile to /userprofile for backward compatibility */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/cashfree-callback" element={<CashfreeCallback />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/address/:totaloffer/:totalprice/:todaydeal" element={<Address />} />
        <Route path="/detailorder/:id" element={<Detailedorder />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="//about" element={<AboutUs />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/security-privacy" element={<SecurityPrivacyPage />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/return-refunds" element={< CancellationRefundPolicy/>} />
        <Route path="/delivery-policy" element={<DeliveryShippingPage />} />
        <Route path="/custom-furnitures" element={<CustomFurniture />} />
         <Route path="/bulk-order" element={<BulkOrder />} />
        {/* Category pages: handled by root `/:slug` route to preserve original paths */}
        {/* ✅ Backwards-compatible slug routing (keeps existing behavior) */}
        <Route path="/:slug" element={<Productpage />} />
      </Routes>
      <Footer />
      <WhatsAppWidget />
    </BrowserRouter>
  );
}

export default App;
