import { products } from "../public/products/products";

// Mock medical products data
export const medicalCategories = [
  { id: "all", name: "All Products" },
  { id: "medicines", name: "Medicines" },
  { id: "equipment", name: "Medical Equipment" },
  { id: "supplies", name: "Medical Supplies" },
  { id: "vitamins", name: "Vitamins & Supplements" },
  { id: "first-aid", name: "First Aid" },
  { id: "personal-care", name: "Personal Care" },
];

export const medicalProducts = [
  // Medicines
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "medicines",
    price: 12.99,
    originalPrice: 15.99,
    description: "Pain relief and fever reducer. Pack of 20 tablets.",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSB0HNsm9Zq3YQK0zO4BwdY_2WS_fCgCCc0VRii9gp6i9sJwdFROk7hXRDo_Vu31pfJTiY_BhRkWCrEMEMOe3UJ8U_OSNNV_9UPDQSrEWvE",
    inStock: true,
    rating: 4.5,
    reviews: 128,
    brand: "MediCare",
    prescription: false,
  },
  {
    id: 2,
    name: "Ibuprofen 400mg",
    category: "medicines",
    price: 18.5,
    originalPrice: 22.0,
    description: "Anti-inflammatory pain reliever. Pack of 30 tablets.",
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ9zIgipP7C03MjOKDWBLdfAqQb0H72iqIIOEe6nb9R06_Fs4kQruczG9MJPyETfjBQwDDkY_BfCwEZSEx5037TPMpBUtNukaNEejIwmQ4kRlDLuoAGGKGPrQ",
    inStock: true,
    rating: 4.3,
    reviews: 95,
    brand: "PharmaCorp",
    prescription: false,
  },
  {
    id: 3,
    name: "Amoxicillin 250mg",
    category: "medicines",
    price: 25.99,
    originalPrice: 29.99,
    description: "Antibiotic for bacterial infections. Pack of 21 capsules.",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTiwQ40d7vsYg89QGSpgBlBCoqtOaWmRRHeWT3i--YRek2uGslw1x397Qx4VFfh06TLToCK_QH_ycX1yHDAeWO7VLlwMlZcYKPjf7SGnoXgKJiAPmR0RaVhaw",
    inStock: true,
    rating: 4.7,
    reviews: 67,
    brand: "AntiBio",
    prescription: true,
  },

  // Medical Equipment
  {
    id: 4,
    name: " ",
    category: "equipment",
    price: 29.99,
    originalPrice: 35.99,
    description: "Fast and accurate digital thermometer with LCD display.",
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTasUqvFA4dLfHRw7MMbvM_-N00i1dpIMyaM2YRP-ZIAOdQXZEazabEWXuEKGU_wgePPu1GNd8yvVGkAb6_iLSHhyJG7hTURHoA4HDmsLdrf7GPCf78ghzvyQ",
    inStock: true,
    rating: 4.6,
    reviews: 203,
    brand: "TempTech",
    prescription: false,
  },
  {
    id: 5,
    name: "Blood Pressure Monitor",
    category: "equipment",
    price: 89.99,
    originalPrice: 109.99,
    description: "Automatic digital blood pressure monitor with large display.",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSST-DOrW1k3H61l6fg0223_H89pDnb9Os0cMkVMI-wVbmrD7j5obcSrYR5GZQdRKXXrjbaoL-zJGqJZ-tQtymgXMIHazbt7sey99lP4LDa7bDIh3yrz5cP",
    inStock: true,
    rating: 4.4,
    reviews: 156,
    brand: "CardioCheck",
    prescription: false,
  },
  {
    id: 6,
    name: "Pulse Oximeter",
    category: "equipment",
    price: 45.99,
    originalPrice: 55.99,
    description: "Fingertip pulse oximeter for oxygen saturation monitoring.",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQADETMkz-41V6r-_F_UfAn6BmmaHg2955DillUazXerun74cKyB9x19TrFdYJdIJObkKexvPURLmUlfFUAQ5eqTn7MDKSPM_6Ct8sGwRiqw3-X2i8Rb04EJg",
    inStock: true,
    rating: 4.5,
    reviews: 89,
    brand: "OxyMeter",
    prescription: false,
  },

  // Medical Supplies
  {
    id: 7,
    name: "Disposable Face Masks",
    category: "supplies",
    price: 19.99,
    originalPrice: 24.99,
    description: "3-layer disposable face masks. Pack of 50.",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT-NWvCm5dwIx7gtQOUhNM3hZaz5W03jkC0CrAAOBQzzHSdWNzbkltEcURvz4IXEiir23X2zkbKcZdYLubsD0vQmM-Oxvx26jXHF0-t2iamy7N8MqbnCqKVdQ",
    inStock: true,
    rating: 4.2,
    reviews: 312,
    brand: "SafeGuard",
    prescription: false,
  },
  {
    id: 8,
    name: "Latex Gloves",
    category: "supplies",
    price: 15.99,
    originalPrice: 19.99,
    description: "Disposable latex examination gloves. Box of 100.",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ7ZZGTxTbff4-QlQV0E98w8aZ5N7lw-EMxPyU2Va6hGrbxTZfbrXQpSWQhzzb7gq4h4M4aVKUwgt0zdh9FieU3YQHdfG3m69ENDaolSTyECBsRCOV2q8t9",
    inStock: true,
    rating: 4.3,
    reviews: 178,
    brand: "MedGlove",
    prescription: false,
  },
  {
    id: 9,
    name: "Sterile Gauze Pads",
    category: "supplies",
    price: 8.99,
    originalPrice: 11.99,
    description: "Sterile gauze pads for wound care. Pack of 25.",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRIJ3O_jtiPiX-sJSUXrJpeRCJqra4ACzHaileHt9NVX15iHWLCT9EForOCHXAu0Mi_gJUh812CSSca2dTpHOaLtgnABtJKw55s3L8qj0qCw5G170L_DwIwlhI",
    inStock: true,
    rating: 4.6,
    reviews: 94,
    brand: "WoundCare",
    prescription: false,
  },

  // Vitamins & Supplements
  {
    id: 10,
    name: "Vitamin D3 1000 IU",
    category: "vitamins",
    price: 22.99,
    originalPrice: 27.99,
    description: "Vitamin D3 supplement for bone health. 60 softgels.",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTM8-KnrrDvXMI2wnlhovSWZr0tFGVvQXNnXlhe0C3PVUPGKkoGvbBi8qhhj_yw_ZhQZXC8B1PkfJucr3ToDfPgrmxYFidI34YKvGmPOyIUZvx0xMT100Olkg",
    inStock: true,
    rating: 4.5,
    reviews: 145,
    brand: "VitaHealth",
    prescription: false,
  },
  {
    id: 11,
    name: "Multivitamin Complex",
    category: "vitamins",
    price: 34.99,
    originalPrice: 42.99,
    description: "Complete multivitamin and mineral supplement. 90 tablets.",
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSjiSyATM0I4Qt9wY9Xeyx5uSYSUMIX9djMk-PyTA5LlKMGHmRrT5ZSN5qiaRuJpD2VbKbZiMK7CwoqP9QJunibmXKwz9piCdnV9pVzlNbH9VTFA3R-mQhk",
    inStock: true,
    rating: 4.4,
    reviews: 267,
    brand: "MultiVit",
    prescription: false,
  },
  {
    id: 12,
    name: "Omega-3 Fish Oil",
    category: "vitamins",
    price: 28.99,
    originalPrice: 34.99,
    description: "High-quality omega-3 fish oil capsules. 120 softgels.",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ9NX9wG1w6dSClt_dATLBnMY3abJgPf2WalEB-9zaq1qulzjSEl3noGDf_hgLPbaC8smin6Y0dW48PodlohyLpjIKZQ2GtHxey-ioqPYKn6mHcw90ArftIC1E",
    inStock: true,
    rating: 4.6,
    reviews: 198,
    brand: "OceanHealth",
    prescription: false,
  },

  // First Aid
  {
    id: 13,
    name: "First Aid Kit",
    category: "first-aid",
    price: 39.99,
    originalPrice: 49.99,
    description: "Complete first aid kit for home and travel. 100+ pieces.",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT05ClBTsw_Qx_EqZT1qCBInUrrMyhtF1RO_4lQ6nGkNZqEXJlJy03HoovPfdgABUco_XB1Jmqobcn6YzjVQsYffikjdF_f0sYDxX6xfAyi46xcIYUmf0g9og",
    inStock: true,
    rating: 4.7,
    reviews: 234,
    brand: "EmergencyCare",
    prescription: false,
  },
  {
    id: 14,
    name: "Adhesive Bandages",
    category: "first-aid",
    price: 6.99,
    originalPrice: 8.99,
    description: "Assorted adhesive bandages for minor cuts. Pack of 40.",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQgaZZSyZLn52vEiUiaVGWDF-AQ-DFJFEscDgfwDvN5xv4f7sdi0HNuv5DkhzidSm6i91A6uVDc_VEI4EaN-kksuxTY4gk0eAtuEKgwUcVEt3t3iNEEnXP26g",
    inStock: true,
    rating: 4.3,
    reviews: 156,
    brand: "HealFast",
    prescription: false,
  },
  {
    id: 15,
    name: "Antiseptic Wipes",
    category: "first-aid",
    price: 9.99,
    originalPrice: 12.99,
    description: "Alcohol-free antiseptic wipes. Pack of 50.",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ-l1cw11H_JhkLFrlw3G4CLWuE9RKjTKg6D09JNGJQ5gP9eyEhcC3XoI_ZVJFFKgtsEgw7Vmr9i32PIMi4aItisrSflqehnKW-IMQW8llj",
    inStock: true,
    rating: 4.4,
    reviews: 87,
    brand: "CleanCare",
    prescription: false,
  },

  // Personal Care
  {
    id: 16,
    name: "Hand Sanitizer",
    category: "personal-care",
    price: 7.99,
    originalPrice: 9.99,
    description: "70% alcohol hand sanitizer gel. 500ml bottle.",
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQovDL7352pUbLpWxoeGO2YNFqhoZtL-_uog94vSPH6T55ui55hsSJUVr4-w0STRa5OdBAdDDMqpQzT2uYCyXaNWg1l0YjBFwJmUJ_Jn-jQ2w2uCJUlw7uaZA",
    inStock: true,
    rating: 4.2,
    reviews: 298,
    brand: "PureHands",
    prescription: false,
  },
  {
    id: 17,
    name: "Antibacterial Soap",
    category: "personal-care",
    price: 5.99,
    originalPrice: 7.99,
    description: "Gentle antibacterial liquid soap. 250ml pump bottle.",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQCXiohYGkua7G0Md_8g31anwArjyhN-nO4GgzJkcWtfyiIxuMZhfk2etqJ8k9UWhjiM-KcjLVlFKBZu8LUUHI-i-Wo4XoovhRiKE-jdNjhJTjEVb0FgnG-7g",
    inStock: true,
    rating: 4.3,
    reviews: 167,
    brand: "CleanSkin",
    prescription: false,
  },
  {
    id: 18,
    name: "Moisturizing Lotion",
    category: "personal-care",
    price: 14.99,
    originalPrice: 18.99,
    description:
      "Hypoallergenic moisturizing lotion for sensitive skin. 400ml.",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTaCwFX_CoEgkebEx3U36fDnQuAVwXIWXhBReOLCJS60Sxk9BBtPy4yaAPlqNILIRrqprzIsitDkHtf620efNFxTvv1TU7-84BW8GfZHvy1GPzmGk6vPrO6cGc",
    inStock: false,
    rating: 4.5,
    reviews: 123,
    brand: "SoftSkin",
    prescription: false,
  },
];

// Price ranges for filtering
export const priceRanges = [
  { id: "all", label: "All Prices", min: 0, max: Infinity },
  { id: "under-10", label: "Under $10", min: 0, max: 10 },
  { id: "10-25", label: "$10 - $25", min: 10, max: 25 },
  { id: "25-50", label: "$25 - $50", min: 25, max: 50 },
  { id: "50-100", label: "$50 - $100", min: 50, max: 100 },
  { id: "over-100", label: "Over $100", min: 100, max: Infinity },
];

// Helper functions
export const getProductsByCategory = (category) => {
  if (category === "all") return medicalProducts;
  return medicalProducts.filter((product) => product.category === category);
};

export const getProductsByPriceRange = (products, priceRange) => {
  const range = priceRanges.find((r) => r.id === priceRange);
  if (!range || range.id === "all") return products;
  return products.filter(
    (product) => product.price >= range.min && product.price <= range.max
  );
};

export const searchProducts = (products, searchTerm) => {
  if (!searchTerm) return products;
  const term = searchTerm.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term)
  );
};

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "popularity":
      return sorted.sort((a, b) => b.reviews - a.reviews);
    default:
      return sorted;
  }
};
