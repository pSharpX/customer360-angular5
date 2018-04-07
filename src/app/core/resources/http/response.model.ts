export interface ResponseModel {
  code: number;
  success: boolean;
  error?: any;
  message?: string;
  data?: any;
  paging?: any;
}
