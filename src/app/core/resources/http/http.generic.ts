import { Observable } from 'rxjs/Observable';

export interface IHttpBaseService<T> {

  Get(url: any, id?: any): Observable<T>;
  GetAll(url: any): Observable<T[]>;
  Search(url: any, term?: any): Observable<T[]>;
  Update(url: any, entity: T): Observable<T>;
  Create(url: any, entity: T): Observable<T>;
  Delete(url: any, id?: any): Observable<boolean>;
}
