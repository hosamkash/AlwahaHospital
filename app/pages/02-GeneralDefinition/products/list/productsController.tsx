"use client"

import { useState } from "react"

// Product Interface
export interface Product {
  id: number
  code: string
  name: string
  majorUnit: string
  conversionFactor: number
  minorUnit: string
  classification: string
  active: boolean
  displayInSales: boolean
  // Major Unit Prices
  majorUnitPurchasePrice: number
  majorUnitSalePrice1: number
  majorUnitSalePrice2: number
  majorUnitSalePrice3: number
  majorUnitSalePrice4: number
  majorUnitSalePrice5: number
  // Major Unit Profits
  majorUnitProfit1: string
  majorUnitProfit2: string
  majorUnitProfit3: string
  majorUnitProfit4: string
  majorUnitProfit5: string
  // Major Unit Profit Percentages
  majorUnitProfitPercentage1: string
  majorUnitProfitPercentage2: string
  majorUnitProfitPercentage3: string
  majorUnitProfitPercentage4: string
  majorUnitProfitPercentage5: string
  // Minor Unit Prices
  minorUnitPurchasePrice: number
  minorUnitSalePrice1: number
  minorUnitSalePrice2: number
  minorUnitSalePrice3: number
  minorUnitSalePrice4: number
  minorUnitSalePrice5: number
  // Minor Unit Profits
  minorUnitProfit1: string
  minorUnitProfit2: string
  minorUnitProfit3: string
  minorUnitProfit4: string
  minorUnitProfit5: string
  // Minor Unit Profit Percentages
  minorUnitProfitPercentage1: string
  minorUnitProfitPercentage2: string
  minorUnitProfitPercentage3: string
  minorUnitProfitPercentage4: string
  minorUnitProfitPercentage5: string
  representativeCommission: number
  managerCommission: number
  minimumLimit: number
  orderLimit: number
}

// Product Classifications
export const productClassifications = [
  "بجامه صیفی",
  "بجامه شتوی",
  "ملابس داخلية",
  "أحذية",
  "إكسسوارات",
  "أدوات منزلية",
  "أدوات طبية",
  "أدوية",
  "مستلزمات طبية",
  "أخرى"
]

// Product Units
export const productUnits = [
  "القطعة",
  "الدستة",
  "الكيلو",
  "اللتر",
  "المتر",
  "العلبة",
  "العبوة",
  "الزجاجة",
  "العلبة الكبيرة",
  "العلبة الصغيرة"
]

// Default Products Data
export const defaultProducts: Product[] = [
  {
    id: 1,
    code: "001",
    name: "بجامه نور 1",
    majorUnit: "الدستة",
    conversionFactor: 12,
    minorUnit: "القطعة",
    classification: "بجامه صیفی",
    active: true,
    displayInSales: true,
         // Major Unit Prices (الدستة)
     majorUnitPurchasePrice: 0.00,
     majorUnitSalePrice1: 0.00,
     majorUnitSalePrice2: 0.00,
     majorUnitSalePrice3: 0.00,
     majorUnitSalePrice4: 0.00,
     majorUnitSalePrice5: 0.00,
     // Major Unit Profits
     majorUnitProfit1: "0.00",
     majorUnitProfit2: "0.00",
     majorUnitProfit3: "0.00",
     majorUnitProfit4: "0.00",
     majorUnitProfit5: "0.00",
     // Major Unit Profit Percentages
     majorUnitProfitPercentage1: "0.0",
     majorUnitProfitPercentage2: "0.0",
     majorUnitProfitPercentage3: "0.0",
     majorUnitProfitPercentage4: "0.0",
     majorUnitProfitPercentage5: "0.0",
     // Minor Unit Prices (القطعة)
     minorUnitPurchasePrice: 0.00,
     minorUnitSalePrice1: 0.00,
     minorUnitSalePrice2: 0.00,
     minorUnitSalePrice3: 0.00,
     minorUnitSalePrice4: 0.00,
     minorUnitSalePrice5: 0.00,
     // Minor Unit Profits
     minorUnitProfit1: "0.00",
     minorUnitProfit2: "0.00",
     minorUnitProfit3: "0.00",
     minorUnitProfit4: "0.00",
     minorUnitProfit5: "0.00",
     // Minor Unit Profit Percentages
     minorUnitProfitPercentage1: "0.0",
     minorUnitProfitPercentage2: "0.0",
     minorUnitProfitPercentage3: "0.0",
     minorUnitProfitPercentage4: "0.0",
     minorUnitProfitPercentage5: "0.0",
    representativeCommission: 0.00,
    managerCommission: 0.00,
    minimumLimit: 0,
    orderLimit: 0
  },
  {
    id: 2,
    code: "002",
    name: "بجامه اكس لارج",
    majorUnit: "الدستة",
    conversionFactor: 12,
    minorUnit: "القطعة",
    classification: "بجامه صیفی",
    active: true,
    displayInSales: true,
         // Major Unit Prices (الدستة)
     majorUnitPurchasePrice: 0.00,
     majorUnitSalePrice1: 0.00,
     majorUnitSalePrice2: 0.00,
     majorUnitSalePrice3: 0.00,
     majorUnitSalePrice4: 0.00,
     majorUnitSalePrice5: 0.00,
     // Major Unit Profits
     majorUnitProfit1: "0.00",
     majorUnitProfit2: "0.00",
     majorUnitProfit3: "0.00",
     majorUnitProfit4: "0.00",
     majorUnitProfit5: "0.00",
     // Major Unit Profit Percentages
     majorUnitProfitPercentage1: "0.0",
     majorUnitProfitPercentage2: "0.0",
     majorUnitProfitPercentage3: "0.0",
     majorUnitProfitPercentage4: "0.0",
     majorUnitProfitPercentage5: "0.0",
     // Minor Unit Prices (القطعة)
     minorUnitPurchasePrice: 0.00,
     minorUnitSalePrice1: 0.00,
     minorUnitSalePrice2: 0.00,
     minorUnitSalePrice3: 0.00,
     minorUnitSalePrice4: 0.00,
     minorUnitSalePrice5: 0.00,
     // Minor Unit Profits
     minorUnitProfit1: "0.00",
     minorUnitProfit2: "0.00",
     minorUnitProfit3: "0.00",
     minorUnitProfit4: "0.00",
     minorUnitProfit5: "0.00",
     // Minor Unit Profit Percentages
     minorUnitProfitPercentage1: "0.0",
     minorUnitProfitPercentage2: "0.0",
     minorUnitProfitPercentage3: "0.0",
     minorUnitProfitPercentage4: "0.0",
     minorUnitProfitPercentage5: "0.0",
    representativeCommission: 0.00,
    managerCommission: 0.00,
    minimumLimit: 0,
    orderLimit: 0
  },
  {
    id: 3,
    code: "003",
    name: "بجامه ستار 2X",
    majorUnit: "الدستة",
    conversionFactor: 12,
    minorUnit: "القطعة",
    classification: "بجامه صیفی",
    active: true,
    displayInSales: true,
         // Major Unit Prices (الدستة)
     majorUnitPurchasePrice: 0.00,
     majorUnitSalePrice1: 0.00,
     majorUnitSalePrice2: 0.00,
     majorUnitSalePrice3: 0.00,
     majorUnitSalePrice4: 0.00,
     majorUnitSalePrice5: 0.00,
     // Major Unit Profits
     majorUnitProfit1: "0.00",
     majorUnitProfit2: "0.00",
     majorUnitProfit3: "0.00",
     majorUnitProfit4: "0.00",
     majorUnitProfit5: "0.00",
     // Major Unit Profit Percentages
     majorUnitProfitPercentage1: "0.0",
     majorUnitProfitPercentage2: "0.0",
     majorUnitProfitPercentage3: "0.0",
     majorUnitProfitPercentage4: "0.0",
     majorUnitProfitPercentage5: "0.0",
     // Minor Unit Prices (القطعة)
     minorUnitPurchasePrice: 0.00,
     minorUnitSalePrice1: 0.00,
     minorUnitSalePrice2: 0.00,
     minorUnitSalePrice3: 0.00,
     minorUnitSalePrice4: 0.00,
     minorUnitSalePrice5: 0.00,
     // Minor Unit Profits
     minorUnitProfit1: "0.00",
     minorUnitProfit2: "0.00",
     minorUnitProfit3: "0.00",
     minorUnitProfit4: "0.00",
     minorUnitProfit5: "0.00",
     // Minor Unit Profit Percentages
     minorUnitProfitPercentage1: "0.0",
     minorUnitProfitPercentage2: "0.0",
     minorUnitProfitPercentage3: "0.0",
     minorUnitProfitPercentage4: "0.0",
     minorUnitProfitPercentage5: "0.0",
    representativeCommission: 0.00,
    managerCommission: 0.00,
    minimumLimit: 0,
    orderLimit: 0
  }
]

// Products Controller Hook
export function useProductsController() {
  const [products, setProducts] = useState<Product[]>(defaultProducts)
  const [showProductDetails, setShowProductDetails] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isNewProduct, setIsNewProduct] = useState(false)

  const handleNewProduct = () => {
    const newProduct: Product = {
      id: Math.max(...products.map(p => p.id)) + 1,
      code: "",
      name: "",
      majorUnit: "الدستة",
      conversionFactor: 12,
      minorUnit: "القطعة",
      classification: "",
      active: true,
      displayInSales: true,
             // Major Unit Prices
       majorUnitPurchasePrice: 0.00,
       majorUnitSalePrice1: 0.00,
       majorUnitSalePrice2: 0.00,
       majorUnitSalePrice3: 0.00,
       majorUnitSalePrice4: 0.00,
       majorUnitSalePrice5: 0.00,
       // Major Unit Profits
       majorUnitProfit1: "0.00",
       majorUnitProfit2: "0.00",
       majorUnitProfit3: "0.00",
       majorUnitProfit4: "0.00",
       majorUnitProfit5: "0.00",
       // Major Unit Profit Percentages
       majorUnitProfitPercentage1: "0.0",
       majorUnitProfitPercentage2: "0.0",
       majorUnitProfitPercentage3: "0.0",
       majorUnitProfitPercentage4: "0.0",
       majorUnitProfitPercentage5: "0.0",
       // Minor Unit Prices
       minorUnitPurchasePrice: 0.00,
       minorUnitSalePrice1: 0.00,
       minorUnitSalePrice2: 0.00,
       minorUnitSalePrice3: 0.00,
       minorUnitSalePrice4: 0.00,
       minorUnitSalePrice5: 0.00,
       // Minor Unit Profits
       minorUnitProfit1: "0.00",
       minorUnitProfit2: "0.00",
       minorUnitProfit3: "0.00",
       minorUnitProfit4: "0.00",
       minorUnitProfit5: "0.00",
       // Minor Unit Profit Percentages
       minorUnitProfitPercentage1: "0.0",
       minorUnitProfitPercentage2: "0.0",
       minorUnitProfitPercentage3: "0.0",
       minorUnitProfitPercentage4: "0.0",
       minorUnitProfitPercentage5: "0.0",
      representativeCommission: 0.00,
      managerCommission: 0.00,
      minimumLimit: 0,
      orderLimit: 0
    }
    setSelectedProduct(newProduct)
    setIsNewProduct(true)
    setShowProductDetails(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsNewProduct(false)
    setShowProductDetails(true)
  }

  const handleCloseDetails = () => {
    setShowProductDetails(false)
    setSelectedProduct(null)
    setIsNewProduct(false)
  }

  const handleSaveProduct = (product: Product) => {
    if (isNewProduct) {
      setProducts([...products, product])
    } else {
      setProducts(products.map(p => p.id === product.id ? product : p))
    }
    handleCloseDetails()
  }

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId))
  }

  const searchProducts = (searchTerm: string) => {
    if (!searchTerm.trim()) return products
    
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.classification.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return {
    products,
    showProductDetails,
    selectedProduct,
    isNewProduct,
    handleNewProduct,
    handleEditProduct,
    handleCloseDetails,
    handleSaveProduct,
    handleDeleteProduct,
    searchProducts,
  }
}

// Products Utilities
export const productsUtils = {
  validateProduct: (product: Product) => {
    const errors: string[] = []
    
    if (!product.code.trim()) {
      errors.push("كود الصنف مطلوب")
    }
    
    if (!product.name.trim()) {
      errors.push("اسم الصنف مطلوب")
    }
    
    if (!product.classification.trim()) {
      errors.push("التصنيف مطلوب")
    }
    
    if (product.conversionFactor <= 0) {
      errors.push("عامل التحويل يجب أن يكون أكبر من صفر")
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  },

  formatPrice: (price: number) => {
    return price.toFixed(2)
  },

  formatNumber: (num: number) => {
    return num.toString()
  },

  calculateProfit: (salePrice: number, purchasePrice: number) => {
    return salePrice - purchasePrice
  },

  calculateProfitPercentage: (salePrice: number, purchasePrice: number) => {
    if (purchasePrice === 0) return 0
    return ((salePrice - purchasePrice) / purchasePrice) * 100
  }
}
