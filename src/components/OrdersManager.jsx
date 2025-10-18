// src/components/OrdersManager.jsx
// VERSIÓN CON CONTEXTO: Toda la lógica centralizada en OrdersContext

import { useEffect, useState, useCallback } from "react";
import { useOrders } from "../context/OrdersContext";
import OrderCard from "./OrderCard";
import OrderFilters from "./OrderFilters"; 
import OrderDetailModal from "./OrderDetailModal";
import "../styles/OrdersManager.css"; 

export default function OrdersManager() {
  const {
    // Estados
    orders,
    currentPage,
    totalPages,
    loading,
    filters,
    
    // Funciones
    loadOrders,
    updateFilters,
    clearFilters,
    goToPage,
    nextPage,
    prevPage,
    getPageNumbers,
    paginationInfo,
  } = useOrders();

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar pedidos al montar el componente
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleOpenModal = useCallback((orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  }, []);

  // Componente de Paginación
  const Pagination = useCallback(() => {
    if (totalPages <= 1) return null;

    const pageNumbers = getPageNumbers();

    return (
      <div className="orders-pagination">
        <button 
          onClick={prevPage} 
          disabled={currentPage <= 1 || loading}
          className="pagination-btn"
          aria-label="Página anterior"
        >
          ← Anterior
        </button>

        <div className="pagination-numbers">
          {pageNumbers.map((page, index) => (
            page === '...' ? (
              <span key={`dots-${index}`} className="pagination-dots">...</span>
            ) : (
              <button
                key={page}
                onClick={() => goToPage(page)}
                disabled={loading}
                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                aria-label={`Ir a página ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <button 
          onClick={nextPage} 
          disabled={currentPage >= totalPages || loading}
          className="pagination-btn"
          aria-label="Página siguiente"
        >
          Siguiente →
        </button>
      </div>
    );
  }, [currentPage, totalPages, loading, getPageNumbers, goToPage, nextPage, prevPage]);

  return (
    <>
      <div className="orders-manager-container">
        <div className="orders-header">
          <h1 className="orders-main-title">Mis Pedidos</h1>
          <p className="orders-subtitle">Busca y filtra tu historial de compras.</p>
        </div>
        
        {/* Layout de Grid: Filtros a la izquierda, contenido a la derecha */}
        <div className="orders-layout">
          {/* Columna de Filtros */}
          <aside className="orders-sidebar">
            <OrderFilters filters={filters} setFilters={updateFilters} />
          </aside>

          {/* Columna de Contenido */}
          <main className="orders-content">
            {loading && orders.length === 0 ? (
              <div className="orders-loading">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              <>
                <div className="orders-results-header">
                  <h2 className="orders-section-title">Pedidos recientes</h2>
                  {paginationInfo && (
                    <span className="orders-count">
                      {paginationInfo.message}
                    </span>
                  )}
                </div>

                {loading && orders.length > 0 && (
                  <div className="orders-loading-overlay">
                    <div className="loading-spinner-small"></div>
                  </div>
                )}

                <div className="orders-grid">
                  {orders.map((order) => (
                    <OrderCard 
                      key={order.id} 
                      order={order} 
                      onViewDetails={() => handleOpenModal(order.id)} 
                    />
                  ))}
                </div>

                {orders.length === 0 && !loading && (
                  <div className="orders-empty">
                    <div className="empty-icon">📦</div>
                    <h3>No se encontraron pedidos</h3>
                    <p>No hay pedidos que coincidan con los filtros aplicados.</p>
                    <button 
                      onClick={clearFilters}
                      className="clear-all-filters-btn"
                    >
                      Limpiar todos los filtros
                    </button>
                  </div>
                )}
                
                <Pagination />
              </>
            )}
          </main>
        </div>
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