import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { Store } from "./store/Store.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
<ErrorBoundary>
<Provider store={Store}>
<AuthProvider>
<CartProvider>
<App />
</CartProvider>
</AuthProvider>
</Provider>
</ErrorBoundary>
</React.StrictMode>
);