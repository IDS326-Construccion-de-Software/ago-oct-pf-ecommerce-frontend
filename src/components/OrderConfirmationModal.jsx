import { createPortal } from 'react-dom';
import React from 'react';
import jsPDF from 'jspdf';
import '../styles/OrderConfirmationModal.css';

const OrderConfirmationModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const handlePrintPdf = () => {
    try {
      const doc = new jsPDF();
      let yPos = 20; // Posición vertical inicial

      // 1. Encabezado
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('The Revenge', 105, yPos, { align: 'center' });
      yPos += 8;  
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text('Recibo de Compra', 105, yPos, { align: 'center' });
      yPos += 15;

      // 2. Detalles de la Orden
      doc.setFontSize(11);
      doc.text(`Referencia: ${order.id}`, 15, yPos);
      doc.text(`Método de Pago: ${order.paymentMethod === 'Tarjeta' ? `Tarjeta **** ${order.cardLast4}` : order.paymentMethod}`, 105, yPos);
      yPos += 6;
      doc.text(`Fecha: ${new Date(order.date).toLocaleString('es-DO')}`, 15, yPos);
      if (order.paymentMethod === 'Tarjeta') {
        doc.text(`Titular: ${order.cardHolder}`, 105, yPos);
      }
      yPos += 10;

      // 3. Tabla de Productos (Manual)
      doc.setDrawColor(0);
      doc.line(15, yPos, 195, yPos); // Línea superior de la tabla
      yPos += 7;
      doc.setFont('helvetica', 'bold');
      doc.text('Producto', 20, yPos);
      doc.text('Cant.', 120, yPos);
      doc.text('Precio', 145, yPos);
      doc.text('Subtotal', 175, yPos);
      yPos += 3;
      doc.line(15, yPos, 195, yPos); // Línea inferior del encabezado
      yPos += 7;

      doc.setFont('helvetica', 'normal');
      order.items.forEach(item => {
        doc.text(item.name, 20, yPos);
        doc.text(item.quantity.toString(), 122, yPos);
        doc.text(`$${item.price.toFixed(2)}`, 145, yPos);
        doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 175, yPos);
        yPos += 7;
      });

      doc.line(15, yPos, 195, yPos); // Línea final de la tabla
      yPos += 10;

      // 4. Resumen Financiero
      const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const taxes = subtotal * 0.18;
      const total = order.total;

      doc.setFontSize(12);
      doc.text(`Subtotal:`, 140, yPos);
      doc.text(`$${subtotal.toFixed(2)}`, 195, yPos, { align: 'right' });
      yPos += 7;
      doc.text(`Impuestos (18%):`, 140, yPos);
      doc.text(`$${taxes.toFixed(2)}`, 195, yPos, { align: 'right' });
      yPos += 7;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`Total Pagado:`, 140, yPos);
      doc.text(`$${total.toFixed(2)}`, 195, yPos, { align: 'right' });

      // Guardar el PDF
      doc.save(`recibo-orden-${order.id}.pdf`);

    } catch (error) {
      console.error("Error al generar el PDF completo:", error);
    }
  };

  return createPortal(
    <div className="ocm-overlay">
      <div className="ocm-container">
        <div className="ocm-header">
          <div className="ocm-icon-success">✓</div>
          <h2>¡Pago Exitoso!</h2>
          <p>Tu transacción ha sido procesada correctamente</p>
        </div>
        <div className="ocm-body">
          <div className="ocm-detail-row">
            <span>Referencia:</span>
            <strong>{order.id}</strong>
          </div>
          <div className="ocm-detail-row">
            <span>Fecha:</span>
            <strong>{new Date(order.date).toLocaleString('es-DO')}</strong>
          </div>
          <div className="ocm-detail-row">
            <span>Método de pago:</span>
            <strong>{order.paymentMethod === 'Tarjeta' ? `Tarjeta **** ${order.cardLast4}` : order.paymentMethod}</strong>
          </div>
          {order.paymentMethod === 'Tarjeta' && (
            <div className="ocm-detail-row">
              <span>Titular:</span>
              <strong>{order.cardHolder}</strong>
            </div>
          )}
          <div className="ocm-total-row">
            <span>Total pagado:</span>
            <strong className="ocm-total-amount">${order.total.toFixed(2)}</strong>
          </div>
        </div>
        <div className="ocm-footer">
          <p className="ocm-email-notice">Recibirás un correo de confirmación con los detalles de tu compra</p>
          <button className="ocm-action-btn" onClick={onClose}>Realizar otro pago</button>
          <button className="ocm-pdf-btn" onClick={handlePrintPdf}>Imprimir PDF</button>
          <p className="ocm-security-notice">🔒 Transacción protegida por The Revenge</p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default OrderConfirmationModal;
