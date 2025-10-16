// src/services/productService.js
// Modo Dual: API Real + Mock Data para desarrollo con Vite
// VERSIÓN COMPLETA: Se añade la función getRelatedProducts.

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
const USE_MOCK_DATA = true // Forzamos el uso de datos mock para depuración

// ============= MOCK DATA (Alineado con el DbContext y formato de API) =============

const mockCategories = [
  {
    id: "c1a7e2a0-7b3c-4f8e-8e6d-5a8b3e2c9f4d",
    name: "Pescados y Mariscos",
    description: "Productos del mar frescos y congelados.",
  },
  { id: "b2b8f3b1-6a2c-4d5e-9e7f-4a7c2d1b8e3a", name: "Deli", description: "Embutidos, quesos y más." },
  { id: "a3c9e4c2-5b1d-4e6f-8d8a-3b6d1c0a7f2e", name: "Despensa", description: "Aceites, condimentos y conservas." },
  { id: "d4d0f5d3-4c0e-4f7g-7c9b-2a5e0b9a6f1d", name: "Carnes", description: "Cortes de carne de res, cerdo y aves." },
  {
    id: "e5e1g6e4-3d9f-4g8h-6b0c-1b4f9a8b5e0c",
    name: "Vinos y Licores",
    description: "Bebidas alcohólicas seleccionadas.",
  },
]

const mockProducts = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Filete de Tilapia Premium Congelado 1 lb",
    description:
      "Filete de tilapia de alta calidad, sin espinas y listo para cocinar. Perfecto para una comida saludable y rápida.",
    price: 259.95,
    brand: "THE REVENGE",
    categoryId: mockCategories[0].id,
    createdAt: "2024-05-20T10:00:00Z",
    productImages: [
      {
        id: "img-uuid-01",
        url: "https://jumbo.com.do/pub/media/catalog/product/cache/5d91a1aa0232de6a069aae492eab5701/2/0/2072871-a.jpg",
        isPrimary: true,
        order: 1,
      },
    ],
    category: mockCategories[0],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Hummus Tradicional Boar's Head 2.5 oz",
    description:
      "Cremoso y delicioso hummus tradicional, elaborado con los mejores ingredientes. Ideal como dip o para untar.",
    price: 59.95,
    brand: "BOAR'S HEAD",
    categoryId: mockCategories[1].id,
    createdAt: "2024-05-20T10:00:00Z",
    productImages: [
      {
        id: "img-uuid-02",
        url: "https://www.instacart.com/image-server/1200x1200/www.instacart.com/assets/domains/product-image/file/large_fc4228a1-92f6-4c9f-9c03-32209fab690c.jpg",
        isPrimary: true,
        order: 1,
      },
    ],
    category: mockCategories[1],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Aceite de Oliva Extra Virgen Coosur 250 ml",
    description:
      "Aceite de oliva extra virgen de origen español, con un sabor frutado y equilibrado. Perfecto para ensaladas y aderezos.",
    price: 259.95,
    brand: "COOSUR",
    categoryId: mockCategories[2].id,
    createdAt: "2024-05-20T10:00:00Z",
    productImages: [
      {
        id: "img-uuid-03",
        url: "https://jumbo.com.do/pub/media/catalog/product/cache/5d91a1aa0232de6a069aae492eab5701/2/0/2075065-A_1.jpg",
        isPrimary: true,
        order: 1,
      },
    ],
    category: mockCategories[2],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Culotte Angus Beef (1lb)",
    description:
      "Corte de carne Angus certificado de alta calidad, conocido por su jugosidad y sabor intenso. Ideal para la parrilla.",
    price: 859.0,
    brand: "Certified Angus Beef",
    categoryId: mockCategories[3].id,
    createdAt: "2024-05-20T10:00:00Z",
    productImages: [
      {
        id: "img-uuid-04",
        url: "https://jumbo.com.do/pub/media/catalog/product/cache/5d91a1aa0232de6a069aae492eab5701/2/0/2090042-A_1.jpg",
        isPrimary: true,
        order: 1,
      },
    ],
    category: mockCategories[3],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Vino Blanco Albariño 75 cl",
    description:
      "Vino blanco de uva Albariño, fresco y aromático con notas cítricas y florales. Maridaje perfecto con pescados y mariscos.",
    price: 1529.95,
    brand: "PACO & LOLA",
    categoryId: mockCategories[4].id,
    createdAt: "2024-05-20T10:00:00Z",
    productImages: [
      {
        id: "img-uuid-05",
        url: "https://jumbo.com.do/pub/media/catalog/product/cache/5d91a1aa0232de6a069aae492eab5701/2/1/2188262-A_3.jpg",
        isPrimary: true,
        order: 1,
      },
    ],
    category: mockCategories[4],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "Pechuga de Pollo Fresca (1lb)",
    description:
      "Pechuga de pollo fresca, sin hueso y sin piel. Una opción versátil y saludable para tus comidas diarias.",
    price: 189.95,
    brand: "THE REVENGE",
    categoryId: mockCategories[3].id,
    createdAt: "2024-05-20T10:00:00Z",
    productImages: [
      {
        id: "img-uuid-06",
        url: "https://jumbo.com.do/pub/media/catalog/product/cache/5d91a1aa0232de6a069aae492eab5701/2/8/2800573-A_3.jpg",
        isPrimary: true,
        order: 1,
      },
    ],
    category: mockCategories[3],
  },
]

const simulateDelay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

// ============= TRANSFORMACIÓN DE DATOS =============

const transformProductData = (productData) => ({
  id: productData.id,
  name: productData.name,
  description: productData.description,
  price: productData.price,
  brand: productData.brand || "Sin marca",
  category: productData.category?.name || "Sin categoría",
  categoryId: productData.categoryId,
  images: productData.productImages?.sort((a, b) => a.order - b.order).map((img) => img.url) || [
    "https://via.placeholder.com/400",
  ],
  createdAt: productData.createdAt,
  updatedAt: productData.updatedAt,
})

// ============= FUNCIONES MOCK =============

const mockGetProductById = async (productId) => {
  await simulateDelay()
  const product = mockProducts.find((p) => p.id === productId)
  if (!product) throw new Error("Producto no encontrado")
  return transformProductData(product)
}

const mockGetAllProducts = async (page = 1, pageSize = 10) => {
  await simulateDelay()
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return {
    items: mockProducts.slice(start, end).map(transformProductData),
    totalCount: mockProducts.length,
    currentPage: page,
    totalPages: Math.ceil(mockProducts.length / pageSize),
  }
}

const mockGetRelatedProducts = async (productId, limit = 4) => {
  await simulateDelay(300)
  const mainProduct = mockProducts.find((p) => p.id === productId)
  if (!mainProduct) return []

  const related = mockProducts
    .filter((p) => p.categoryId === mainProduct.categoryId && p.id !== productId)
    .slice(0, limit)

  return related.map(transformProductData)
}

// ============= FUNCIONES API REAL (Plantillas) =============

const apiGetProductById = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`)
  if (!response.ok) throw new Error("Producto no encontrado")
  return transformProductData(await response.json())
}

const apiGetAllProducts = async (page = 1, pageSize = 10) => {
  const response = await fetch(`${API_BASE_URL}/products?page=${page}&pageSize=${pageSize}`)
  if (!response.ok) throw new Error("Error al obtener productos")
  const data = await response.json()
  return {
    items: data.items.map(transformProductData),
    totalCount: data.totalCount,
    currentPage: data.currentPage,
    totalPages: data.totalPages,
  }
}

const apiGetRelatedProducts = async (productId, limit = 4) => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}/related?limit=${limit}`)
  if (!response.ok) return []
  const data = await response.json()
  return data.map(transformProductData)
}

// ============= EXPORTS PÚBLICOS =============

export const getProductById = async (productId) => {
  try {
    return USE_MOCK_DATA ? await mockGetProductById(productId) : await apiGetProductById(productId)
  } catch (error) {
    console.error("Error en getProductById:", error)
    throw error
  }
}

export const getAllProducts = async (page = 1, pageSize = 10) => {
  try {
    return USE_MOCK_DATA ? await mockGetAllProducts(page, pageSize) : await apiGetAllProducts(page, pageSize)
  } catch (error) {
    console.error("Error en getAllProducts:", error)
    throw error
  }
}

export const getRelatedProducts = async (productId, limit = 4) => {
  try {
    return USE_MOCK_DATA
      ? await mockGetRelatedProducts(productId, limit)
      : await apiGetRelatedProducts(productId, limit)
  } catch (error) {
    console.error("Error en getRelatedProducts:", error)
    return []
  }
}
