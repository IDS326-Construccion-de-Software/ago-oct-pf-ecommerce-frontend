"use client"

import { useEffect, useState } from "react"
import { filterMyOrders, formatCurrency } from "../services/orderService"
import OrderDetailModal from "./OrderDetailModal"
import "../styles/OrderCard.css"

export default function OrderCard() {
  const [orders, setOrders] = useState([])
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const data = await filterMyOrders(
          {
            search: "",
            status: "all",
            dateFrom: "",
            dateTo: "",
            minAmount: "",
            maxAmount: "",
            productSearch: "",
          },
          1,
          10,
        )
        setOrders(data.items)
      } catch (error) {
        console.error("Error al obtener las órdenes:", error)
        setOrders([])
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const handleOpenModal = (id) => {
    setSelectedOrderId(id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedOrderId(null)
  }

  const capitalizeFirstLetter = (string) => {
    if (!string) return ""
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className="container">
      <h2 className="section-title mb-4">Pedidos recientes</h2>

      {loading ? (
        <p className="text-center">Cargando pedidos...</p>
      ) : orders.length === 0 ? (
        <p className="text-center">No tienes pedidos para mostrar.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id} className="order-card" onClick={() => handleOpenModal(order.id)}>
              <div className="order-card-content">
                <div className="order-card-header">
                  <div>
                    <h3 className="order-card-title">{order.customerName}</h3>
                    <p className="order-card-subtitle">Fecha: {new Date(order.date).toLocaleDateString("es-ES")}</p>
                    <p className="order-card-subtitle">ID: {order.id}</p>
                  </div>

                  <span className={`order-badge badge-${order.status}`}>{capitalizeFirstLetter(order.status)}</span>
                </div>

                <div className="order-card-details">
                  <div className="order-card-detail-item">
                    <span className="info-label">Total:</span>
                    <span className="info-value">{formatCurrency(order.total)}</span>
                  </div>
                </div>

                <div className="order-card-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenModal(order.id)
                    }}
                    className="order-view-btn"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && <OrderDetailModal orderId={selectedOrderId} open={isModalOpen} onClose={handleCloseModal} />}
    </div>
  )
}
