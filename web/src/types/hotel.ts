export interface Hotel {
    id: string;
    name: string;
    description: string;
    location: string;
    address: string;
    city: string;
    country: string;
    rating: number;
    price: string;
    priceValue: number;
    status: string;
    isActive: boolean;
    type: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    lastBooking: string;
    totalBookings: number;
    revenue: string;
    owner: string;
    ownerId: string;
    email: string;
    phone: string;
    // Business/Legal fields
    taxId: string;
    taxOffice: string;
    tradeRegistryNumber: string;
    businessLicense: string;
    addressProof: string;
    taxCertificate: string;
    // Discount fields
    discountRate: number;
    isDiscounted: boolean;
    discountStartDate: string | null;
    discountEndDate: string | null;
    // Features
    features: string[];
  }