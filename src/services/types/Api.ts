export interface IAuth {
  username: string;
  password: string;
}

export interface IOneRecord {
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}

export interface IApiResponce<T extends IAuthResponce | TDataRequest | IOneRecordOnServer | undefined> {
  error_code: number;
  error_message: string;
  profiling: string;
  timings: null;
  data: T;
}

export interface IAuthResponce {
  token: string;
}

export interface IOneRecordOnServer extends IOneRecord {
  id: string
}

export type TDataRequest = Array<IOneRecordOnServer>;