import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import CMSProducts from "./pages/CMS/Products";
import CMSOrders from "./pages/CMS/Orders";
import CMSLayout from "./pages/CMS/Layout";
import ProfileOrders from "./pages/UserProfile/Orders";
import ProfileLayout from "./pages/UserProfile/Layout";
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit'

const App = () => {
  return (
    <Routes>
      {/* <Route path="login" element={<Login />} /> */}
      {/* <Route path="register" element={<Register />} /> */}

      {/* <Route path="/" element={<Layout />}> */}

      {/* protected */}
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<Product />} />

      <Route path="/profile/orders" element={<ProfileLayout><ProfileOrders /></ProfileLayout>} />

      <Route path="/cms/products" element={<CMSLayout><CMSProducts /></CMSLayout>} />
      <Route path="/cms/orders" element={<CMSLayout><CMSOrders /></CMSLayout>} />

      {/* </Route> */}

      {/* <Route path="*" element={<Missing />} /> */}

    </Routes>
  )
};

export default App;