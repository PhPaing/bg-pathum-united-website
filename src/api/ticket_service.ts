const API_BASE_DIRECT = 'https://localhost:7193/api';
const API_BASE_PROXY = '/aspnet-api/api';
const USE_PROXY = false; 
const API_BASE_URL = USE_PROXY ? API_BASE_PROXY : API_BASE_DIRECT;
const TICKETS_URL = `${API_BASE_URL}/tickets`;

export interface Ticket {
  id: number;
  matchName: string;
  seat: string;
  price: number;
  matchDate: string | Date;
  isSold: boolean;
  soldDate?: string | Date;
  buyerName?: string;
}

export interface TicketViewModel {
  matchName: string;
  seat: string;
  price: number;
  matchDate: string | Date;
}

export interface PurchaseRequest {
  id: number;
  matchName: string;
  seat: string;
  price: number;
  matchDate: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface TicketSearchCriteria {
  matchName?: string;
  seat?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface TicketStats {
  totalTickets: number;
  soldTickets: number;
  unsoldTickets: number;
  availableTickets: number;
  pastTickets: number;
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
  totalRevenue: number;
  soldVsAvailableRatio?: number;
  nextAvailableMatch?: Ticket;
}

// Helper function with error handling
async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); 

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options?.headers,
      },
    });

    clearTimeout(timeoutId);

    if (response.status === 204) {
      return {} as T;
    }

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        const text = await response.text();
        if (text) errorMessage = text;
      }
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return {} as T;
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout. Check if API is running.');
    }
    
    if (error.message.includes('Failed to fetch')) {
      throw new Error(`Cannot connect to API. Make sure it's running at ${API_BASE_DIRECT}`);
    }
    
    throw error;
  }
}

export const ticketService = {
  async getAll(): Promise<Ticket[]> {
    console.log('Fetching tickets from:', TICKETS_URL);
    return fetchApi<Ticket[]>(TICKETS_URL);
  },

  async getById(id: number): Promise<Ticket> {
    return fetchApi<Ticket>(`${TICKETS_URL}/${id}`);
  },

  async create(ticketData: TicketViewModel): Promise<Ticket> {
    return fetchApi<Ticket>(TICKETS_URL, {
      method: 'POST',
      body: JSON.stringify(ticketData),
    });
  },

  async update(id: number, ticketData: TicketViewModel): Promise<void> {
    const ticketToUpdate = {
      id,
      ...ticketData
    };
    
    await fetchApi<void>(`${TICKETS_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ticketToUpdate),
    });
  },

  async delete(id: number): Promise<void> {
    await fetchApi<void>(`${TICKETS_URL}/${id}`, {
      method: 'DELETE',
    });
  },

  async search(criteria: TicketSearchCriteria): Promise<Ticket[]> {
    const queryParams = new URLSearchParams();
    if (criteria.matchName) queryParams.append('matchName', criteria.matchName);
    if (criteria.seat) queryParams.append('seat', criteria.seat);
    if (criteria.minPrice !== undefined) queryParams.append('minPrice', criteria.minPrice.toString());
    if (criteria.maxPrice !== undefined) queryParams.append('maxPrice', criteria.maxPrice.toString());
    
    const queryString = queryParams.toString();
    const url = queryString ? `${TICKETS_URL}/search?${queryString}` : `${TICKETS_URL}/search`;
    
    console.log('Searching tickets with URL:', url);
    return fetchApi<Ticket[]>(url);
  },

  async healthCheck(): Promise<any> {
    return fetchApi<any>(`${TICKETS_URL}/health`);
  },

  async getAvailable(): Promise<Ticket[]> {
  const response = await fetchApi<{ tickets: Ticket[] }>(`${TICKETS_URL}/available`);
  return response.tickets || [];
  },

  async purchase(purchaseData: PurchaseRequest): Promise<Ticket> {
    return fetchApi<Ticket>(`${TICKETS_URL}/purchase`, {
      method: 'POST',
      body: JSON.stringify(purchaseData),
    });
  },

  async getPurchased(): Promise<Ticket[]> {
  const response = await fetchApi<{ tickets: Ticket[] }>(`${TICKETS_URL}/purchased`);
  return response.tickets || [];
  },

  async getPurchasedByBuyer(buyerName: string): Promise<Ticket[]> {
    return fetchApi<Ticket[]>(`${TICKETS_URL}/purchased/${encodeURIComponent(buyerName)}`);
  },

  async getStats(): Promise<TicketStats> {
    return fetchApi<TicketStats>(`${TICKETS_URL}/stats`);
  },

  async getUpcoming(limit: number = 5): Promise<Ticket[]> {
  const response = await fetchApi<{ matches: Ticket[] }>(`${TICKETS_URL}/upcoming${limit ? `?limit=${limit}` : ''}`);
  return response.matches || [];
  },

  async getAllUpcoming(): Promise<Ticket[]> {
    return fetchApi<Ticket[]>(`${TICKETS_URL}/upcoming/all`);
  },

  async getSoldStats(): Promise<any> {
    return fetchApi<any>(`${TICKETS_URL}/sold-stats`);
  },

  async getApiInfo(): Promise<{
    url: string;
    corsEnabled: boolean;
    status: string;
  }> {
    return {
      url: API_BASE_URL,
      corsEnabled: !USE_PROXY,
      status: await this.healthCheck().then(() => 'Connected').catch(() => 'Disconnected')
    };
  }
};