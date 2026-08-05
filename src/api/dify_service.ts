export interface DifyRequest {
  inputs: Record<string, any>;
  query: string;
  response_mode: 'streaming';
  conversation_id: string;
  user?: string;
  files?: any[];

}

export interface DifyStreamResponse {
  event: 'message' | 'done' | 'error';
  task_id: string;
  id: string;
  message_id: string;
  conversation_id: string;
  mode?: string;
  answer: string;
  metadata?: {
    usage?: {
      prompt_tokens: number;
      prompt_unit_price: string;
      prompt_price_unit: string;
      prompt_price: string;
      completion_tokens: number;
      completion_unit_price: string;
      completion_price_unit: string;
      completion_price: string;
      total_tokens: number;
      total_price: string;
      currency: string;
      latency: number;
    };
    retriever_resources?: any[];
  };
  created_at: number;
  error?: string;
  code?: string;
  status?: number;
  audio?: string;
}
class DifyAPIService {
  private baseURL = "/dify";
  private apiKey = import.meta.env.VITE_DIFY_API_KEY;


  async sendMessage(query: string, userId?: string) {
    const response = await fetch(
      //`${this.baseURL}/v1/chat-messages`,
      `http://10.210.40.16/v1/chat-messages`,      
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          inputs: {},
          query,
          response_mode: 'blocking',
          user: userId || 'web_user',
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`${response.status}: ${text}`);
    }

    return response.json();
  }
}

export const difyService = new DifyAPIService();
