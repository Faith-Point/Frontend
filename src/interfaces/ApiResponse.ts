export interface ApiResponse<T> {
  message: string;
  hasError: boolean;
  data: T;
}
