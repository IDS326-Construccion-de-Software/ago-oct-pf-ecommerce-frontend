import Header from "../components/Header";
import Footer from "../components/Footer";
import OrdersManager from "../components/OrdersManager";

const OrdersPage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <OrdersManager />
      </div>
    </main>
    <Footer />
  </div>
);

export default OrdersPage;