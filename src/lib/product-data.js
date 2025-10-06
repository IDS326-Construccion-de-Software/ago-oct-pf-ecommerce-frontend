export const mockProducts = [
  {
    id: "1",
    name: "Leche Entera La Serenísima",
    description: "Leche entera pasteurizada de alta calidad, rica en calcio y proteínas. Ideal para toda la familia.",
    price: 850,
    originalPrice: 950,
    discount: 11,
    category: "Lácteos",
    brand: "La Serenísima",
    images: ["/leche-entera-carton.jpg", "/leche-nutrition-facts.jpg", "/leche-brand-logo.jpg"],
    inStock: true,
    stockQuantity: 45,
    rating: 4.8,
    reviewCount: 234,
    nutritionalInfo: {
      calories: 150,
      protein: "8g",
      carbs: "12g",
      fat: "8g",
      fiber: "0g",
    },
    specifications: {
      weight: "1L",
      dimensions: "7x7x23cm",
      origin: "Argentina",
      expiryDate: "2024-12-15",
    },
    tags: ["Lácteos", "Calcio", "Proteínas", "Familia"],
    relatedProducts: ["2", "3"],
  },
  {
    id: "2",
    name: "Pan Integral Bimbo",
    description: "Pan integral con semillas, rico en fibra y nutrientes. Perfecto para desayunos saludables.",
    price: 420,
    category: "Panadería",
    brand: "Bimbo",
    images: ["/pan-integral-semillas.jpg", "/pan-sliced-bread.jpg"],
    inStock: true,
    stockQuantity: 28,
    rating: 4.5,
    reviewCount: 156,
    nutritionalInfo: {
      calories: 80,
      protein: "4g",
      carbs: "15g",
      fat: "1g",
      fiber: "3g",
    },
    specifications: {
      weight: "500g",
      dimensions: "25x12x8cm",
      origin: "Argentina",
    },
    tags: ["Integral", "Fibra", "Saludable", "Desayuno"],
    relatedProducts: ["1", "3"],
  },
  {
    id: "3",
    name: "Manzanas Rojas Premium",
    description:
      "Manzanas rojas frescas y crujientes, seleccionadas especialmente. Ricas en vitaminas y antioxidantes.",
    price: 680,
    category: "Frutas y Verduras",
    brand: "Granja del Sol",
    images: ["/manzanas-rojas-frescas.jpg", "/apple-nutrition-vitamins.jpg"],
    inStock: true,
    stockQuantity: 67,
    rating: 4.7,
    reviewCount: 89,
    nutritionalInfo: {
      calories: 52,
      protein: "0.3g",
      carbs: "14g",
      fat: "0.2g",
      fiber: "2.4g",
    },
    specifications: {
      weight: "1kg",
      dimensions: "Variable",
      origin: "Mendoza, Argentina",
    },
    tags: ["Fresco", "Vitaminas", "Antioxidantes", "Natural"],
    relatedProducts: ["1", "2"],
  },
]

export const getProductById = (id) => {
  return mockProducts.find((product) => product.id === id)
}

export const getRelatedProducts = (productId) => {
  const product = getProductById(productId)
  if (!product) return []

  return product.relatedProducts.map((id) => getProductById(id)).filter(Boolean)
}
