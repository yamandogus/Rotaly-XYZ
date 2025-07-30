export const hotelData = {
    id: "1",
    name: "Riad Deluxe",
    location: "Marakeş, Fas",
    image: "/images/hotelfoto1.jpg",
    rating: 4.7,
    ratingCount: 120,
    features: {
      cancelFree: true,
      breakfast: true,
      parking: true,
    },
  };

  export const bookingData = {
    checkIn: "18 Temmuz 2025",
    checkOut: "22 Temmuz 2025",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    roomType: "Deluxe Room",
    nights: 4,
    guests: 2,
    basePrice: 30000,
    taxesAndFees: 10500,
    total: 40500,
  };


  export const paymentMethods = [
    {
      id: 1,
      name: "Visa",
      cardNumber: "**** 8304",
      cardType: "Visa",
    },
    {
      id: 2,
      name: "Mastercard",
      cardNumber: "**** 1234",
      cardType: "Mastercard",
    },
    {
      id: 3,
      name: "Troy",
      cardNumber: "**** 1234",
      cardType: "Troy",
    },
    
  ];