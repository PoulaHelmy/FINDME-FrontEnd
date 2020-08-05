export interface UserDto {
  name: string;
  age: string;
  complete: boolean;
}
export interface userInfo {
  email: string;
  password: string;
}
export class User {
  public id: number;
  public name: string;
  public age: string;
  public complete: boolean;

  constructor(
    { name, age, complete }: UserDto = {
      name: null,
      age: null,
      complete: false,
    }
  ) {
    this.id = 0;
    this.name = name;
    this.age = age;
    this.complete = complete;
  }
}

// private url='http://pizzaService';
// private endpoint = 'pizzas';
//
//   constructor(
//     protected httpClient: HttpClient) {}
//
// public create(pizza: Pizza): Observable<Pizza> {
//     return this.httpClient
//       .post<Pizza>(`${this.url}/${this.endpoint}`, pizza);
//   }
//
// public update(pizza: Pizza): Observable<Pizza> {
//     return this.httpClient
//       .put<Pizza>(`${this.url}/${this.endpoint}/${pizza.id}`, pizza);
//   }
//
//   read(id: number): Observable<Pizza> {
//     return this.httpClient
//       .get<Pizza>(`${this.url}/${this.endpoint}/${id}`);
//   }
//
//   list(): Observable<Pizza[]> {
//     return this.httpClient
//       .get<Pizza[]>(`${this.url}/${this.endpoint}`);
//   }
//
//   delete(id: number) {
//     return this.httpClient
//       .delete(`${this.url}/${this.endpoint}/${id}`);
//   }
