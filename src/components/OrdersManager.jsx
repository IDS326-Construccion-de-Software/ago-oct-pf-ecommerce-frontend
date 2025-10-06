// src/components/OrdersManager.jsx
// CORRECCIÓN: Se importa y usa la función correcta 'filterMyOrders'.

import { useState, useEffect, useCallback } from "react";
import OrderCard from "./OrderCard";
import OrderFilters from "./OrderFilters"; 
import OrderDetailModal from "./OrderDetailModal";
// ¡CAMBIO CLAVE! Importamos la función correcta que sí existe en el servicio.
import { filterMyOrders } from "../services/orderService"; 
import "../styles/OrdersPage.css"; 

export default function OrdersManager() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    dateFrom: "",
    dateTo: "",
    minAmount: "",
    maxAmount: "",
    productSearch: "",
  });
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        // ¡CAMBIO CLAVE! Usamos la nueva función que acepta filtros y paginación.
        const data = await filterMyOrders(filters, currentPage);
        setOrders(data.items);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error cargando pedidos del usuario:', error);
        setOrders([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [filters, currentPage]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); 
  };
  
  const handleOpenModal = useCallback((orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  }, []);

  const Pagination = () => (
    <div className="flex justify-center items-center space-x-4 mt-6">
      <button 
        onClick={() => setCurrentPage(p => p - 1)} 
        disabled={currentPage <= 1 || loading}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      <span>Página {currentPage} de {totalPages}</span>
      <button 
        onClick={() => setCurrentPage(p => p + 1)} 
        disabled={currentPage >= totalPages || loading}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </div>
  );

  return (
    <>
      <div className="orders-manager p-6 space-y-4">
        <div className="orders-header">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">
            Mis Pedidos
          </h1>
          <p className="orders-subtitle">Busca y filtra tu historial de compras.</p>
        </div>
        
        <OrderFilters filters={filters} setFilters={handleFilterChange} />

        {loading ? (
          <p className="text-gray-500">Cargando pedidos...</p>
        ) : (
          <>
            <div className="orders-grid space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} onViewDetails={() => handleOpenModal(order.id)} />
              ))}
            </div>
            {orders.length === 0 && <p className="text-center text-gray-500 mt-8">No se encontraron pedidos con los filtros aplicados.</p>}
            
            {totalPages > 1 && <Pagination />}
          </>
        )}
      </div>

      {isModalOpen && (
        <OrderDetailModal 
          orderId={selectedOrderId} 
          open={isModalOpen} 
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
}