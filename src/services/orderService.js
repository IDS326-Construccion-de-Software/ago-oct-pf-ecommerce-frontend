// src/services/orderService.js
// Modo Dual: API Real + Mock Data para desarrollo con Vite

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK === "true" || !import.meta.env.VITE_API_URL

const getAuthToken = () => {
  return localStorage.getItem("authToken") || ""
}

// ============= MOCK DATA (Alineado con el DbContext) =============

const mockUsers = [
  {
    id: "user-001",
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    directions: JSON.stringify([{ id: 1, street: "Calle Principal #123", city: "Santo Domingo", isDefault: true }]),
  },
  {
    id: "user-002",
    name: "Ana López",
    email: "ana.lopez@email.com",
    directions: JSON.stringify([{ id: 1, street: "Av. Independencia #456", city: "Santo Domingo", isDefault: true }]),
  },
  {
    id: "user-003",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    directions: JSON.stringify([
      { id: 1, street: "Calle César Nicolás Penson #87", city: "Santo Domingo", isDefault: true },
    ]),
  },
]

const mockPaymentMethods = [
  { id: "pm-001", name: "Tarjeta de Crédito", provider: "Visa" },
  { id: "pm-002", name: "Efectivo", provider: "Cash" },
]

const mockOrders = [
  {
    id: "order-001",
    userId: mockUsers[0].id,
    total: 2550.0,
    status: "completed",
    placedAt: "2024-05-20T14:30:00Z",
    user: mockUsers[0],
    orderItems: [
      {
        id: "item1",
        quantity: 2,
        unitPrice: 259.95,
        subtotal: 519.9,
        product: {
          id: "550e8400-e29b-41d4-a716-446655440001",
          name: "Filete de Tilapia Premium",
          productImages: [
            {
              url: "https://jumbo.com.do/pub/media/catalog/product/cache/5d91a1aa0232de6a069aae492eab5701/2/0/2072871-a.jpg",
            },
          ],
        },
      },
      {
        id: "item2",
        quantity: 3,
        unitPrice: 189.95,
        subtotal: 569.85,
        product: {
          id: "550e8400-e29b-41d4-a716-446655440006",
          name: "Pechuga de Pollo Fresca",
          productImages: [
            {
              url: "https://jumbo.com.do/pub/media/catalog/product/cache/5d91a1aa0232de6a069aae492eab5701/2/8/2800573-A_3.jpg",
            },
          ],
        },
      },
      {
        id: "item2b",
        quantity: 1,
        unitPrice: 259.95,
        subtotal: 259.95,
        product: {
          id: "550e8400-e29b-41d4-a716-446655440003",
          name: "Aceite de Oliva Extra Virgen",
          productImages: [
            {
              url: "https://jumbo.com.do/pub/media/catalog/product/cache/5d91a1aa0232de6a069aae492eab5701/2/0/2075065-A_1.jpg",
            },
          ],
        },
      },
      {
        id: "item2c",
        quantity: 2,
        unitPrice: 59.95,
        subtotal: 119.9,
        product: {
          id: "550e8400-e29b-41d4-a716-446655440002",
          name: "Hummus Tradicional Boar's Head",
          productImages: [
            {
              url: "https://www.instacart.com/image-server/1200x1200/www.instacart.com/assets/domains/product-image/file/large_fc4228a1-92f6-4c9f-9c03-32209fab690c.jpg",
            },
          ],
        },
      },
      {
        id: "item2d",
        quantity: 1,
        unitPrice: 859.0,
        subtotal: 859.0,
        product: {
          id: "550e8400-e29b-41d4-a716-446655440004",
          name: "Culotte Angus Beef",
          productImages: [
            {
              url: "https://jumbo.com.do/pub/media/catalog/product/cache/5d91a1aa0232de6a069aae492eab5701/2/0/2090042-A_1.jpg",
            },
          ],
        },
      },
    ],
    invoices: [],
    payments: [{ paymentMethod: mockPaymentMethods[0] }],
  },
  {
    id: "order-002",
    userId: mockUsers[0].id,
    total: 1260.0,
    status: "pending",
    placedAt: "2024-05-22T10:15:00Z",
    user: mockUsers[0],
    orderItems: [
      {
        id: "item3",
        quantity: 1,
        unitPrice: 1260.0,
        subtotal: 1260.0,
        product: {
          id: "550e8400-e29b-41d4-a716-446655440005",
          name: "Vino Blanco Albariño",
          productImages: [
            {
              url: "https://jumbo.com.do/pub/media/catalog/product/cache/5d91a1aa0232de6a069aae492eab5701/2/1/2188262-A_3.jpg",
            },
          ],
        },
      },
    ],
    invoices: [],
    payments: [{ paymentMethod: mockPaymentMethods[1] }],
  },
  {
    id: "order-003",
    userId: mockUsers[0].id,
    total: 1280.0,
    status: "cancelled",
    placedAt: "2024-05-21T16:45:00Z",
    user: mockUsers[0],
    orderItems: [
      {
        id: "item4",
        quantity: 2,
        unitPrice: 640.0,
        subtotal: 1280.0,
        product: {
          id: "550e8400-e29b-41d4-a716-446655440003",
          name: "Aceite de Oliva Extra Virgen",
          productImages: [
            {
              url: "https://jumbo.com.do/pub/media/catalog/product/cache/5d91a1aa0232de6a069aae492eab5701/2/0/2075065-A_1.jpg",
            },
          ],
        },
      },
    ],
    invoices: [],
    payments: [{ paymentMethod: mockPaymentMethods[0] }],
  },
  {
    id: "order-004",
    userId: mockUsers[0].id,
    total: 3500.0,
    status: "completed",
    placedAt: "2024-04-15T11:00:00Z",
    user: mockUsers[0],
    orderItems: [
      {
        id: "item5",
        quantity: 4,
        unitPrice: 859.0,
        subtotal: 3436.0,
        product: {
          id: "550e8400-e29b-41d4-a716-446655440004",
          name: "Culotte Angus Beef (1lb)",
          productImages: [
            {
              url: "https://jumbo.com.do/pub/media/catalog/product/cache/5d91a1aa0232de6a069aae492eab5701/2/0/2090042-A_1.jpg",
            },
          ],
        },
      },
    ],
    invoices: [],
    payments: [{ paymentMethod: mockPaymentMethods[0] }],
  },
  {
    id: "order-005",
    userId: mockUsers[0].id,
    total: 450.0,
    status: "pending",
    placedAt: "2024-06-01T09:30:00Z",
    user: mockUsers[0],
    orderItems: [
      {
        id: "item6",
        quantity: 3,
        unitPrice: 150.0,
        subtotal: 450.0,
        product: {
          id: "550e8400-e29b-41d4-a716-446655440002",
          name: "Hummus Tradicional Boar's Head",
          productImages: [
            {
              url: "https://www.instacart.com/image-server/1200x1200/www.instacart.com/assets/domains/product-image/file/large_fc4228a1-92f6-4c9f-9c03-32209fab690c.jpg",
            },
          ],
        },
      },
    ],
    invoices: [],
    payments: [{ paymentMethod: mockPaymentMethods[1] }],
  },
]

// --- SIMULACIÓN DE AUTENTICACIÓN ---
const getCurrentUser = () => {
  return mockUsers.find((u) => u.id === "user-001")
}

const simulateDelay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

// ============= TRANSFORMACIÓN DE DATOS =============

const mapOrderStatus = (dbStatus) => {
  const statusMap = {
    pending: "pendiente",
    processing: "procesando",
    completed: "entregado",
    cancelled: "cancelado",
  }
  return statusMap[dbStatus?.toLowerCase()] || "desconocido"
}

const getDeliveryAddress = (user) => {
  if (!user || !user.directions) return "Dirección no especificada"
  try {
    const directions = JSON.parse(user.directions)
    if (Array.isArray(directions) && directions[0]) {
      return `${directions[0].street || ""}, ${directions[0].city || ""}`.trim()
    }
  } catch (error) {
    console.error("Error parseando direcciones:", error)
  }
  return "Dirección no especificada"
}

const transformOrderData = (order) => ({
  id: order.id,
  customerName: order.user?.name || "Cliente",
  status: mapOrderStatus(order.status),
  date: order.placedAt,
  total: order.total,
  deliveryAddress: getDeliveryAddress(order.user),
  paymentMethod: order.payments?.[0]?.paymentMethod?.name || "No especificado",
  items:
    order.orderItems?.map((item) => ({
      id: item.id,
      productId: item.product?.id || null,
      name: item.product?.name || "Producto Desconocido",
      quantity: item.quantity,
      price: item.unitPrice,
      subtotal: item.subtotal,
      image: item.product?.productImages?.[0]?.url || "/placeholder.svg",
    })) || [],
})

// ============= FUNCIONES MOCK CON FILTROS COMPLETOS =============

const mockFilterMyOrders = async (filters, page = 1, pageSize = 10) => {
  await simulateDelay(500)
  const currentUser = getCurrentUser()
  if (!currentUser) return { items: [], totalPages: 0, totalCount: 0, currentPage: page }

  let myOrders = [...mockOrders].filter((order) => order.userId === currentUser.id)

  // Filtro por búsqueda de ID
  if (filters.search && filters.search.trim()) {
    const searchTerm = filters.search.toLowerCase().trim()
    myOrders = myOrders.filter((o) => o.id.toLowerCase().includes(searchTerm))
  }

  // Filtro por búsqueda de producto
  if (filters.productSearch && filters.productSearch.trim()) {
    const productSearchTerm = filters.productSearch.toLowerCase().trim()
    myOrders = myOrders.filter((order) =>
      order.orderItems.some((item) =>
        item.product?.name?.toLowerCase().includes(productSearchTerm)
      )
    )
  }

  // Filtro por estado
  if (filters.status && filters.status !== "all") {
    const dbStatusMap = {
      entregado: "completed",
      pendiente: "pending",
      cancelado: "cancelled",
      procesando: "processing",
    }
    const dbStatus = dbStatusMap[filters.status]
    if (dbStatus) {
      myOrders = myOrders.filter((o) => o.status === dbStatus)
    }
  }

  // Filtro por fecha desde
  if (filters.dateFrom) {
    const fromDate = new Date(filters.dateFrom)
    fromDate.setHours(0, 0, 0, 0)
    myOrders = myOrders.filter((o) => new Date(o.placedAt) >= fromDate)
  }

  // Filtro por fecha hasta
  if (filters.dateTo) {
    const toDate = new Date(filters.dateTo)
    toDate.setHours(23, 59, 59, 999)
    myOrders = myOrders.filter((o) => new Date(o.placedAt) <= toDate)
  }

  // Filtro por monto mínimo
  if (filters.minAmount && !isNaN(parseFloat(filters.minAmount))) {
    const minAmount = parseFloat(filters.minAmount)
    myOrders = myOrders.filter((o) => o.total >= minAmount)
  }

  // Filtro por monto máximo
  if (filters.maxAmount && !isNaN(parseFloat(filters.maxAmount))) {
    const maxAmount = parseFloat(filters.maxAmount)
    myOrders = myOrders.filter((o) => o.total <= maxAmount)
  }

  // Ordenar por fecha (más reciente primero)
  myOrders.sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt))

  const totalCount = myOrders.length
  const totalPages = Math.ceil(totalCount / pageSize)
  const startIndex = (page - 1) * pageSize
  const paginatedItems = myOrders.slice(startIndex, startIndex + pageSize)

  return {
    items: paginatedItems.map(transformOrderData),
    totalPages,
    totalCount,
    currentPage: page,
  }
}

const mockGetOrderById = async (orderId) => {
  await simulateDelay()
  const order = mockOrders.find((o) => o.id === orderId)
  if (!order) throw new Error("Pedido no encontrado")
  return transformOrderData(order)
}

// ============= FUNCIONES API REAL (Plantillas) =============

const apiFilterMyOrders = async (filters, page = 1, pageSize = 10) => {
  const params = new URLSearchParams({ page, pageSize })
  Object.keys(filters).forEach((key) => {
    if (filters[key] && (key !== "status" || filters[key] !== "all")) {
      params.append(key, filters[key])
    }
  })

  const response = await fetch(`${API_BASE_URL}/orders/me/search?${params.toString()}`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  })
  if (!response.ok) throw new Error("Error al filtrar mis pedidos")
  const data = await response.json()

  return {
    ...data,
    items: data.items.map(transformOrderData),
  }
}

const apiGetOrderById = async (orderId) => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  })
  if (!response.ok) throw new Error("Pedido no encontrado")
  return transformOrderData(await response.json())
}

// ============= EXPORTS PÚBLICOS =============

export const filterMyOrders = async (filters, page = 1, pageSize = 10) => {
  try {
    return USE_MOCK_DATA
      ? await mockFilterMyOrders(filters, page, pageSize)
      : await apiFilterMyOrders(filters, page, pageSize)
  } catch (error) {
    console.error("Error en filterMyOrders:", error)
    return { items: [], totalPages: 0, totalCount: 0, currentPage: page }
  }
}

export const getOrderById = async (orderId) => {
  try {
    return USE_MOCK_DATA ? await mockGetOrderById(orderId) : await apiGetOrderById(orderId)
  } catch (error) {
    console.error("Error en getOrderById:", error)
    throw error
  }
}

export const formatCurrency = (amount) => {
  if (typeof amount !== "number") {
    return "RD$0.00"
  }
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
  }).format(amount)
}