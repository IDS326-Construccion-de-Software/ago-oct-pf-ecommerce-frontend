import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import { OrdersProvider } from "./context/OrdersContext";
import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider } from './context/AuthContext';
import GlobalCartWrapper from './components/GlobalCartWrapper';
import Landing from './pages/Landing';
import Login from './pages/Login';
import CartDetail from './pages/CartDetail';
import Products from './pages/Products';
import SettingsPage from './pages/SettingsPage';
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import NewPassword from "./pages/NewPassword";
import UserProfile from './pages/UserProfile';
import OrderConfirmation from './pages/OrderConfirmation';
import OrdersPage from './pages/OrdersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Register from './pages/Register';
import Help from './pages/Help';
import NotFound from './pages/NotFound';


export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <CartProvider>
          <OrdersProvider>
            <GlobalCartWrapper>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/producto/:id" element={<ProductDetailPage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:category" element={<Products />} />
                {/* Legacy/alt category paths */}
                <Route path="/categoria/:category" element={<Navigate to={"/products/:category"} replace />} />
                <Route path="/categorias/:category" element={<Navigate to={"/products/:category"} replace />} />
                <Route path="/cartDetail" element={<CartDetail />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/recover/code" element={<VerifyCode />} />
                <Route path="/new-password" element={<NewPassword />} />
                <Route path="/login" element={<Login />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/register" element={<Register />} />
                <Route path="/ayuda" element={<Help />} />
                <Route path="*" element={<NotFound />} />

              </Routes>
            </GlobalCartWrapper>
          </OrdersProvider>
        </CartProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}