import { TOKEN } from "../const";
import { getCookie } from "../cookie";
import { IApiResponce, IAuth, IAuthResponce, IOneRecord, IOneRecordOnServer, TDataRequest } from "../types/Api";

interface ImainApi {
  baseUrl: string;
}

class mainApi {
  private _baseUrl: string;
  private _token: string | undefined;

  constructor({ baseUrl }: ImainApi) {
    this._baseUrl = baseUrl;
    this._token = undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _fetcher(path: string, method: "GET" | "POST" | "PATCH", body?: any) {
    this._token = getCookie(TOKEN);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    if (this._token !== undefined) {
      headers.append("x-auth", `${this._token}`);
    }
    const options = {
      method,
      headers,
      body,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return fetch(`${this._baseUrl}${path}`, options).then(this.responseHandler);
  }

  private responseHandler = (res: Response) =>
    res.ok ? res.json() : Promise.reject(res);

  auth = (body: IAuth): Promise<IApiResponce<IAuthResponce>> =>
    this._fetcher("/ru/data/v3/testmethods/docs/login", "POST", body);
  getData = (): Promise<IApiResponce<TDataRequest>> =>
    this._fetcher("/ru/data/v3/testmethods/docs/userdocs/get", "GET");
  create = (body: IOneRecord): Promise<IApiResponce<IOneRecordOnServer>> =>
    this._fetcher("/ru/data/v3/testmethods/docs/userdocs/create", "POST", body);
  delete = (id: string): Promise<IApiResponce<undefined>> =>
    this._fetcher(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, "POST");
  update = (
    id: string,
    body: IOneRecord
  ): Promise<IApiResponce<IOneRecordOnServer>> =>
    this._fetcher(
      `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
      "POST",
      body
    );
}

const adress = "https://test.v5.pryaniky.com";

const Api = new mainApi({
  baseUrl: adress,
});

export default Api;
