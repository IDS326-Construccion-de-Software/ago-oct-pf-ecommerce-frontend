// src/components/OrderCard.jsx
import { formatCurrency } from "../services/orderService";
import { Package, Calendar, Hash } from "lucide-react";
import "../styles/OrderCard.css";

export default function OrderCard({ order, onViewDetails }) {
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getStatusColor = (status) => {
    const statusMap = {
      entregado: "success",
      pendiente: "warning",
      cancelado: "danger",
    };
    return statusMap[status.toLowerCase()] || "default";
  };

  return (
    <div className="order-card" onClick={onViewDetails}>
      <div className="order-card-header">
        <div className="order-card-title-section">
          <h3 className="order-card-customer">{order.customerName}</h3>
          <span className={`order-status-badge status-${getStatusColor(order.status)}`}>
            {capitalizeFirstLetter(order.status)}
          </span>
        </div>
      </div>

      <div className="order-card-body">
        <div className="order-info-grid">
          <div className="order-info-item">
            <Calendar size={16} className="order-info-icon" />
            <div>
              <span className="order-info-label">Fecha</span>
              <span className="order-info-value">
                {new Date(order.date).toLocaleDateString("es-ES")}
              </span>
            </div>
          </div>

          <div className="order-info-item">
            <Hash size={16} className="order-info-icon" />
            <div>
              <span className="order-info-label">ID</span>
              <span className="order-info-value order-id">{order.id}</span>
            </div>
          </div>

          <div className="order-info-item">
            <Package size={16} className="order-info-icon" />
            <div>
              <span className="order-info-label">Total</span>
              <span className="order-info-value order-total">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-card-footer">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
          className="order-details-btn"
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
}