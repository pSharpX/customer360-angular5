import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IHttpBaseService} from './http.generic';
import {HttpExtend} from './http.extend.service';
import {HttpConst} from './http.const';
import {ResponseModel} from './response.model';
import {Response} from '@angular/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpGenericService<T> implements IHttpBaseService<T> {
  constructor(private http: HttpExtend) {
  }

  Get(url: any, id?: any): Observable<T> | Observable<any> {
    const $resource = this.resourceURI(url);
    return this.http.get($resource)
      .map(this.handleResponse)
      .map((respModel: ResponseModel) => {
        return (<T>respModel.data) || respModel.error;
      })
      .catch(this.handleError);
  }

  GetFile(url: any): Observable<Blob> {
    const $resource = this.resourceURI(url);
    return this.http.getFile($resource)
      .catch(this.handleError);
  }

  GetAll(url: any): Observable<T[]> | Observable<any> {
    const $resource = this.resourceURI(url);
    return this.http.get($resource)
      .map(this.handleResponse)
      .map((respModel: ResponseModel) => {
        return (<T[]>respModel.data) || respModel.error;
      })
      .catch(this.handleError);
  }

  Search(url: any, term?: any): Observable<T[]> {
    const $resource = this.resourceURI(url);
    return this.http.get($resource)
      .map(this.handleResponse)
      .map((respModel: ResponseModel) => {
        return respModel.data.map(item => {
          return <T>item;
        });
      })
      .catch(this.handleError);
  }

  Update(url: any, entity: T, stringify?: boolean): Observable<T> | Observable<any> {
    const $resource = this.resourceURI(url);
    let body: any = entity;
    if (stringify && stringify === true) {
      body = JSON.stringify(entity); // Stringify payload
    }
    return this.http.put($resource, body)
      .map(this.handleResponse)
      .map((respModel: ResponseModel) => {
        console.log(respModel);

        return (respModel);
      })
      .catch(this.handleError);
  }

  Create(url: any, entity: T, stringify?: boolean): Observable<T> | Observable<any> {
    const $resource = this.resourceURI(url);
    let body: any = entity;
    if (stringify && stringify === true) {
      body = JSON.stringify(entity); // Stringify payload
    }
    return this.http.post($resource, body)
      .map(this.handleResponse)
      .map((respModel: ResponseModel) => {
        return (<T>respModel.data) || respModel.error;
      })
      .catch(this.handleError);
  }

  Delete(url: any, id?: any): Observable<boolean> {
    const $resource = this.resourceURI(url);
    return this.http.delete($resource)
      .map(this.handleResponse)
      .map((respModel: ResponseModel) => {
        return respModel.data;
      })
      .catch(this.handleError);
  }

  private resourceURI(url: any) {
    return `${environment.apiUrl}/${url}`;
  }

  private handleResponse(res: Response): ResponseModel {
    return <ResponseModel>res.json();
  }

  private handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(<ResponseModel>{
      code: error.status || 500,
      error: errMsg,
      success: false,
      data: {},
      message: errMsg,
      paging: {}
    });
  }
}
