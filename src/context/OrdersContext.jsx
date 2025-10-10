// src/context/OrdersContext.jsx
import { createContext, useState, useContext, useCallback, useRef, useMemo, useEffect } from "react";
import { filterMyOrders as filterMyOrdersService, getOrderById as getOrderByIdService } from "../services/orderService";

export const OrdersContext = createContext();

// Custom hook para usar el contexto más fácilmente
export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders debe ser usado dentro de un OrdersProvider");
  }
  return context;
};

// Hook personalizado para debouncing
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function OrdersProvider({ children }) {
  // Estados principales
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estados de filtros
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    dateFrom: "",
    dateTo: "",
    minAmount: "",
    maxAmount: "",
    productSearch: "",
  });

  // Cache de resultados
  const cacheRef = useRef(new Map());
  const pageSize = 10;

  // Debouncing para búsquedas
  const debouncedSearchFilters = useDebounce(
    { search: filters.search, productSearch: filters.productSearch },
    500
  );

  // Combinar filtros con debouncing
  const effectiveFilters = useMemo(() => ({
    ...filters,
    search: debouncedSearchFilters.search,
    productSearch: debouncedSearchFilters.productSearch,
  }), [filters, debouncedSearchFilters]);

  // Generar clave de cache
  const getCacheKey = useCallback((filters, page) => {
    return JSON.stringify({ filters, page });
  }, []);

  // Función para cargar pedidos con cache
  const loadOrders = useCallback(async (page = currentPage, customFilters = effectiveFilters) => {
    const cacheKey = getCacheKey(customFilters, page);
    
    // Verificar cache
    if (cacheRef.current.has(cacheKey)) {
      const cachedData = cacheRef.current.get(cacheKey);
      setOrders(cachedData.items);
      setTotalPages(cachedData.totalPages);
      setTotalCount(cachedData.totalCount);
      setCurrentPage(page);
      return cachedData;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await filterMyOrdersService(customFilters, page, pageSize);
      
      // Guardar en cache (límite de 50 entradas)
      if (cacheRef.current.size > 50) {
        const firstKey = cacheRef.current.keys().next().value;
        cacheRef.current.delete(firstKey);
      }
      cacheRef.current.set(cacheKey, data);

      setOrders(data.items);
      setTotalPages(data.totalPages);
      setTotalCount(data.totalCount);
      setCurrentPage(page);

      return data;
    } catch (err) {
      console.error('Error cargando pedidos:', err);
      setError(err.message || 'Error al cargar pedidos');
      setOrders([]);
      setTotalPages(0);
      setTotalCount(0);
      return null;
    } finally {
      setLoading(false);
    }
  }, [currentPage, effectiveFilters, getCacheKey, pageSize]);

  // Función para obtener un pedido por ID
  const getOrderById = useCallback(async (orderId) => {
    setLoading(true);
    setError(null);

    try {
      const order = await getOrderByIdService(orderId);
      return order;
    } catch (err) {
      console.error('Error obteniendo pedido:', err);
      setError(err.message || 'Error al obtener el pedido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para actualizar filtros
  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset a primera página
    cacheRef.current.clear(); // Limpiar cache al cambiar filtros
  }, []);

  // Función para limpiar filtros
  const clearFilters = useCallback(() => {
    const defaultFilters = {
      search: "",
      status: "all",
      dateFrom: "",
      dateTo: "",
      minAmount: "",
      maxAmount: "",
      productSearch: "",
    };
    setFilters(defaultFilters);
    setCurrentPage(1);
    cacheRef.current.clear();
  }, []);

  // Función para cambiar de página
  const goToPage = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages && !loading) {
      loadOrders(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [totalPages, loading, loadOrders]);

  // Función para ir a la página siguiente
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, goToPage]);

  // Función para ir a la página anterior
  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  // Función para refrescar pedidos (sin cache)
  const refreshOrders = useCallback(() => {
    cacheRef.current.clear();
    loadOrders(currentPage);
  }, [currentPage, loadOrders]);

  // Información de paginación
  const paginationInfo = useMemo(() => {
    if (totalCount === 0) return null;
    
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);
    
    return {
      start,
      end,
      total: totalCount,
      message: `Mostrando ${start}-${end} de ${totalCount} resultados`
    };
  }, [currentPage, totalCount, pageSize]);

  // Obtener números de página para la paginación
  const getPageNumbers = useCallback(() => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  }, [currentPage, totalPages]);

  // Estadísticas de filtros activos
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.productSearch) count++;
    if (filters.status && filters.status !== "all") count++;
    if (filters.dateFrom) count++;
    if (filters.dateTo) count++;
    if (filters.minAmount) count++;
    if (filters.maxAmount) count++;
    return count;
  }, [filters]);

  const value = {
    // Estados
    orders,
    currentPage,
    totalPages,
    totalCount,
    loading,
    error,
    filters,
    
    // Funciones de carga
    loadOrders,
    getOrderById,
    refreshOrders,
    
    // Funciones de filtros
    updateFilters,
    clearFilters,
    activeFiltersCount,
    
    // Funciones de paginación
    goToPage,
    nextPage,
    prevPage,
    getPageNumbers,
    paginationInfo,
    
    // Configuración
    pageSize,
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
}