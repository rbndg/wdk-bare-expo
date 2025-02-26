export interface WDKResponse {
  result?: any;
  error?: {
    code: number;
    msg: string;
  };
  method?: string;
  params?: [{
    status: string;
    message: string | null;
  }];
} 