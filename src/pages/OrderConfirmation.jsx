import React, { useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const summaryRef = useRef();

  const handlePrintPdf = () => {
    if (!summaryRef.current) return;

    html2canvas(summaryRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`recibo-orden-${order.id}.pdf`);
    });
  };

  if (!order) {
    return (
      <div className="confirmation-container">
        <h1>Error</h1>
        <p>No se encontraron los detalles de la orden.</p>
        <Link to="/" className="btn-primary">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-box">
        <div className="success-icon">✓</div>
        <h1>¡Gracias por tu compra!</h1>
        <p>Tu orden ha sido procesada exitosamente.</p>
        
        <div className="order-summary" ref={summaryRef}>
          <h2>Resumen de la Orden</h2>
          <p><strong>Número de Orden:</strong> {order.id}</p>
          <p><strong>Fecha:</strong> {new Date(order.date).toLocaleDateString('es-DO')}</p>
          <p><strong>Total:</strong> <span className="total-amount">${order.total.toFixed(2)}</span></p>
          
          <h3>Productos Comprados:</h3>
          <ul>
            {order.items.map(item => (
              <li key={item.id}>{item.name} - {item.quantity} x ${item.price.toFixed(2)}</li>
            ))}
          </ul>
        </div>

        <div className="confirmation-actions">
          <button className="btn-secondary" onClick={handlePrintPdf}>Imprimir Recibo (PDF)</button>
          <Link to="/" className="btn-primary">Seguir Comprando</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
