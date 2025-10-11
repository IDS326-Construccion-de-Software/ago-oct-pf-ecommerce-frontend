"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getOrderById, formatCurrency } from "../services/orderService"
import Portal from "./Portal"
import "../styles/OrderDetailModal.css"

export default function OrderDetailModal({ orderId, open, onClose }) {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open || !orderId) return

    const fetchOrderDetails = async () => {
      setLoading(true)
      try {
        const orderData = await getOrderById(orderId)
        setOrder(orderData)
      } catch (error) {
        console.error("Error cargando detalles del pedido:", error)
        setOrder(null)
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderId, open])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/producto/${productId}`)
      onClose()
    }
  }

  if (!open) return null

  return (
    <Portal>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">
            <svg className="modal-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="modal-title-text">Detalles del Pedido</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {loading ? (
            <div className="text-center py-12">Cargando detalles...</div>
          ) : order ? (
            <>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">
                    <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                      />
                    </svg>
                    ID del pedido
                  </span>
                  <p className="info-value">{order.id}</p>
                </div>

                <div className="info-item">
                  <span className="info-label">
                    <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Cliente
                  </span>
                  <p className="info-value">{order.customerName}</p>
                </div>

                <div className="info-item">
                  <span className="info-label">
                    <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Fecha
                  </span>
                  <p className="info-value">{new Date(order.date).toLocaleString("es-ES")}</p>
                </div>

                <div className="info-item">
                  <span className="info-label">
                    <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Estado
                  </span>
                  <span className={`badge badge-${order.status}`}>{order.status}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">
                    <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Dirección
                  </span>
                  <p className="info-value">{order.deliveryAddress}</p>
                </div>

                <div className="info-item">
                  <span className="info-label">
                    <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    Método de pago
                  </span>
                  <p className="payment-method">{order.paymentMethod}</p>
                </div>
              </div>

              <hr className="divider" />

              <div className="section">
                <h3 className="section-title">Artículos del pedido</h3>
                <div className="products-list">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="product-card product-card-clickable"
                      onClick={() => handleProductClick(item.productId)}
                      style={{ cursor: item.productId ? "pointer" : "default" }}
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="product-image"
                        style={{ width: "64px", height: "64px", borderRadius: "8px", objectFit: "cover" }}
                      />
                      <div className="product-info">
                        <p className="product-name">{item.name}</p>
                        <p className="product-details">
                          {item.quantity} × {formatCurrency(item.price)}
                        </p>
                      </div>
                      <div className="product-total">{formatCurrency(item.subtotal)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="divider" />

              <div className="cost-summary">
                <div className="cost-row">
                  <span className="cost-label">Subtotal:</span>
                  <span className="cost-value">{formatCurrency(order.total)}</span>
                </div>
                <hr className="cost-divider" />
                <div className="cost-row cost-total">
                  <span>Total:</span>
                  <span className="total-amount">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">No se encontró información del pedido.</div>
          )}
        </div>
      </div>
    </Portal>
  )
}
