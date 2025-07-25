import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { GlobalMessageProvider } from "./context/GlobalMessageContext";
import "./index.css";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalMessageProvider>
        <AuthProvider>
          <CartProvider> 
           <WishlistProvider>
           <OrderProvider>
            <App />
           </OrderProvider>
           </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </GlobalMessageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
