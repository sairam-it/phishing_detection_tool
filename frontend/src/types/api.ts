export interface URLInput {
  url: string;
}

export interface ScanResult {
  url: string;
  verdict: 'safe' | 'suspicious' | 'malicious';
  score: number;
  reasons: string[];
}

export interface APIError {
  message: string;
  status?: number;
}