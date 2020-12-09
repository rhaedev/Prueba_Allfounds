import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export abstract class BaseService<Type = any> {
  protected path: string = '';
  protected model: {
    label: string;
    new (data?: Partial<Type>): Type;
  } | undefined;
  public url = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  public get baseUrl() {
    return `${this.url}${this.path}`;
  }

   find<Response = Type>(params?: any): Observable<Response[]> {
    let urlFilter = params ? `?filter=${encodeURIComponent(JSON.stringify(params))}` : '';
    return this.http.get<Response[]>(this.baseUrl + urlFilter).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  deleteById<Response = Type>(id: string) {
    return this.http.delete<Response>(this.baseUrl + "/" + id).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  findById<Response = Type>(id: string) {
    return this.http.get<Response>(this.baseUrl + "/" + id).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  count() {
    return this.http.get(this.baseUrl + "/" + "count").pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  create<Response = Type>(form: any) {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    return this.http.post<Response>(this.baseUrl, form, { headers });
  }

  public update<Response = Type>(value: any, id: string): Observable<Response> {
    let headers = new HttpHeaders();

    headers.append("Content-Type", "application/json");

    return this.http
      .put<Response>(this.baseUrl + "/" + id, value, { headers })
      .pipe(map((resp) => this.createInstance(resp)));
  }

  public createInstance(data: Type | any) {
    return this.model ? new this.model(data) : data;
  }

  login(userForm: any) {
    const body = {
      email: userForm.value.email,
      password: userForm.value.password
    };

    return this.http
      .post<any>(this.baseUrl + "/login", body)
      .pipe(map((resp) => resp));
  }
}