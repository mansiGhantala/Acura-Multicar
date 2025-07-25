import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminUsers from "./pages/admin/AdminUsers";
import ProductForm from "./components/admin/ProductForm";

// Not Found Page
import NotFound from "./pages/NotFound";
import AdminOrders from "./pages/admin/AdminOrders";
import CategoryPage from "./pages/CategoryPage";

const App = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<SingleProduct />} />
      <Route path="/category/:cat" element={<CategoryPage />} />

      <Route element={<PrivateRoute />}>
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="cart" element={<Cart />} />
        <Route path="my-orders" element={<MyOrders/>}/>
        <Route path="orders/:id" element={<OrderDetails />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>

    {/* ✅ Admin Protected */}
  <Route path="/admin" element={<AdminRoute />}>
  <Route element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path="orders" element={<AdminOrders />} />
    <Route path="products" element={<AdminProducts />} />
    <Route path="product" element={<ProductForm />} />            
    <Route path="product/:id" element={<ProductForm />} />        
    <Route path="contacts" element={<AdminContacts />} />
    <Route path="users" element={<AdminUsers />} />
    <Route path="*" element={<NotFound />} />
  </Route>
</Route>


  </Routes>
);

export default App;
