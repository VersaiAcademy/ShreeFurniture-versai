import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Productpage from "./pages/Productpage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Whislist from "./pages/Whislist";
import DetaileProduct from "./pages/DetaileProduct";
import UserProfile from "./pages/UserProfile";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Detailedorder from "./pages/Detailedorder";
import Contactus from "./pages/Contactus";

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/whishlist" element={<Whislist />} />
        <Route path="/dtproduct/:id" element={<DetaileProduct />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/address/:totaloffer/:totalprice/:todaydeal" element={<Address />} />
        <Route path="/detailorder/:id" element={<Detailedorder />} />
        <Route path="/contactus" element={<Contactus />} />
        
        {/* ✅ NEW: Dynamic slug-based routing - handles all category/subcategory pages */}
        <Route path="/:slug" element={<Productpage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;