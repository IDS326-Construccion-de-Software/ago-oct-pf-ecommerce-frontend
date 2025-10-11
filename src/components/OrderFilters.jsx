// src/components/OrderFilters.jsx
import { useCallback } from "react";
import { Search, X, Calendar } from "lucide-react";
import "../styles/OrderFilters.css"; // Asegúrate de que la ruta sea correcta

export default function OrderFilters({ filters, setFilters }) {
  // Salvaguarda: si las props esenciales no llegan, no renderiza nada para evitar errores.
  if (!filters || !setFilters) {
    return null;
  }
  
  const updateFilter = useCallback((key, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
  }, [setFilters]);

  const clearAllFilters = useCallback(() => {
    setFilters({
      search: "",
      status: "all",
      dateFrom: "",
      dateTo: "",
      minAmount: "",
      maxAmount: "",
      productSearch: "",
    });
  }, [setFilters]);

  // --- LÓGICA CORREGIDA ---
  // Implementamos el cuerpo de la función para que devuelva un array.
  const getActiveFilters = () => {
    const active = []; // Siempre devolvemos un array

    if (filters.search) active.push(`Búsqueda: "${filters.search}"`);
    if (filters.productSearch) active.push(`Producto: "${filters.productSearch}"`);
    if (filters.status && filters.status !== "all") {
      const formattedStatus = filters.status.charAt(0).toUpperCase() + filters.status.slice(1);
      active.push(`Estado: ${formattedStatus}`);
    }
    if (filters.dateFrom) active.push(`Desde: ${new Date(filters.dateFrom).toLocaleDateString("es-ES")}`);
    if (filters.dateTo) active.push(`Hasta: ${new Date(filters.dateTo).toLocaleDateString("es-ES")}`);
    if (filters.minAmount) active.push(`Mín: RD$${filters.minAmount}`);
    if (filters.maxAmount) active.push(`Máx: RD$${filters.maxAmount}`);
    
    return active;
  };
  // --- FIN DE LA CORRECCIÓN ---

  const activeFilters = getActiveFilters();

  return (
    <div className="order-filters">
      <div className="filters-header">
        <h2 className="filters-title">
          <Search size={20} className="filters-title-icon" />
          Filtros
        </h2>
        {activeFilters.length > 0 && (
          <button onClick={clearAllFilters} className="clear-filters-btn">
            <X size={16} className="clear-filters-btn-icon" />
            Limpiar
          </button>
        )}
      </div>

      <div className="filters-content">
        {/* Búsqueda general */}
        <div className="search-input-wrapper">
          <Search size={18} className="search-input-icon" />
          <input
            type="text"
            placeholder="Buscar por ID..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="search-input"
          />
        </div>

        {/* Búsqueda por producto */}
        <div className="search-input-wrapper">
          <Search size={18} className="search-input-icon" />
          <input
            type="text"
            placeholder="Buscar por producto..."
            value={filters.productSearch}
            onChange={(e) => updateFilter('productSearch', e.target.value)}
            className="search-input"
          />
        </div>

        {/* Estado */}
        <div className="filter-group">
          <label className="filter-label">Estado</label>
          <select
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value)}
            className="status-select"
          >
            <option value="all">Todos</option>
            <option value="entregado">Entregado</option>
            <option value="pendiente">Pendiente</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        {/* Fechas */}
        <div className="filter-group">
          <label className="filter-label">Desde</label>
          <div className="date-input-wrapper">
            <Calendar size={16} className="date-input-icon" />
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => updateFilter('dateFrom', e.target.value)}
              className="date-input"
            />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Hasta</label>
          <div className="date-input-wrapper">
            <Calendar size={16} className="date-input-icon" />
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => updateFilter('dateTo', e.target.value)}
              className="date-input"
            />
          </div>
        </div>

        {/* Montos */}
        <div className="filter-group">
          <label className="filter-label">Min RD$</label>
          <input
            type="number"
            placeholder="0"
            min="0"
            value={filters.minAmount}
            onChange={(e) => updateFilter('minAmount', e.target.value)}
            className="amount-input"
          />
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Max RD$</label>
          <input
            type="number"
            placeholder="9999"
            min="0"
            value={filters.maxAmount}
            onChange={(e) => updateFilter('maxAmount', e.target.value)}
            className="amount-input"
          />
        </div>
      </div>
      
      {activeFilters.length > 0 && (
        <div className="active-filters-section">
          <div className="active-filters-container">
            <span className="active-filters-label">Activos:</span>
            {activeFilters.map((filter, index) => (
              <span key={index} className="filter-badge">
                {filter}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}