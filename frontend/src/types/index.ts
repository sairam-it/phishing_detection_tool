export interface URLScanResult {
  url: string;
  verdict: 'safe' | 'suspicious' | 'malicious';
  score: number;
  reasons: string[];
}

export interface ScanResponse {
  url: string;
  verdict: 'safe' | 'suspicious' | 'malicious';
  score: number;
  reasons: string[];
}

export interface APIError {
  message: string;
  status?: number;
}