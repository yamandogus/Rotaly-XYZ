export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    isVerified: boolean;
    role: 'CUSTOMER' | 'OWNER' | 'ADMIN' | 'SUPPORT';
    images?: Array<{
      id: string;
      url: string;
    }>;
    paymentCards?: Array<{
      id: string;
      brand: string;
      last4: string;
      expiresAt: string;
    }>;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    accessToken: string | null;
    refreshToken: string | null;
  }