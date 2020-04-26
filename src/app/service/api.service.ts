import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ApiService {
  private rootApiPath = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  testApiService(){
      return ' API Service is Working';
  }

  getHttpParams(data: any) {
    let httpParams = new HttpParams();
    // tslint:disable-next-line:only-arrow-functions
    Object.keys(data).forEach(function(key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return httpParams;
  }

  buildFullPath(route) {
    return this.rootApiPath + "/" + route;
  }

  getWithParam(data: any, route: string) {
    const path = this.buildFullPath(route);
    return this.http.get(path, { params: this.getHttpParams(data) }).pipe(
      map((response: any) => {
        const result = response;
        if (!result.status) {
          this.handleValidationErrors();
        }
        return result;
      }),
      catchError((error: Response) => {
        return this.handleExceptions(error);
      })
    );
  }

  getPDFWithParam(data: any, route: string) {
    const path = this.buildFullPath(route);
    return this.http.get(path, { params: this.getHttpParams(data) }).pipe(
      map((response: any) => {
        const blob = new Blob([response], { type: "application/pdf" });
        // return  new Blob([response.blob()], { type: 'application/pdf' });
        return {
          Result: new Blob([blob], { type: "application/pdf" }),
          Status: "success"
        };
      }),
      catchError((error: Response) => {
        return this.handleExceptions(error);
      })
    );
  }

  // {
  //     response: {}
  //     status: success/error/failure
  // }
  getWithRoute(route: string) {
    const path = this.buildFullPath(route);
    return this.http.get(path).pipe(
      map((response: any) => {
        const result = response;
        if (!result.status) {
          this.handleValidationErrors();
        }
        return result;
      }),
      catchError((error: Response) => {
        return this.handleExceptions(error);
      })
    );
  }

  postDataWithMedia(data: any,route: string){
    const path = this.buildFullPath(route);
    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    headers.append("Accept", "application/json");
    let formData = new FormData();
    const keys = Object.keys(data);
    
    formData.append("media",  data.media);
    formData.append("status", data.status);
    if(data && data.mediaFile){
      for(let i = 0 ; i < data.mediaFile.length; i++){
        formData.append("mediaFile", data.mediaFile[i], data.mediaFile[i].name);
      }
    }
    return (
      this.http
        // tslint:disable-next-line:object-literal-shorthand
        .post(path, formData, { headers: headers, reportProgress: true })
        .pipe(
          map((response: any) => {
            const result = response;
            if (!result.status) {
              this.handleValidationErrors();
            }
            return result;
          }),
          catchError((error: Response) => {
            return this.handleExceptions(error);
          })
        )
    );    
  }


  postData(data: object, route: string) {
    const path = this.buildFullPath(route);
    return this.http.post(path, data).pipe(
      map((response: any) => {
        const result = response;
        if (!result.status) {
          this.handleValidationErrors();
        }
        return result;
      }),
      catchError((error: Response) => {
        console.dir(error);
        return this.handleExceptions(error);
      })
    );
  }

  putData(data: object, route: string) {
    const path = this.buildFullPath(route);
    return this.http.put(path, data).pipe(
      map((response: any) => {
        const result = response;
        if (!result.status) {
          this.handleValidationErrors();
        }
        return result;
      }),
      catchError((error: Response) => {
        return this.handleExceptions(error);
      })
    );
  }

  importFile(file: any, route: string) {
    const formData: FormData = new FormData();
    formData.append("uploadFile", file, file.name);
    const path = this.buildFullPath(route);
    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    headers.append("Accept", "application/json");
    return (
      this.http
        // tslint:disable-next-line:object-literal-shorthand
        .post(path, formData, { headers: headers, reportProgress: true })
        .pipe(
          map((response: any) => {
            const result = response;
            if (!result.status) {
              this.handleValidationErrors();
            }
            return result;
          }),
          catchError((error: Response) => {
            return this.handleExceptions(error);
          })
        )
    );
  }

  postForBlobWithParam(data: any, route: string) {
    const path = this.buildFullPath(route);

    return this.http.post(path, data, { responseType: "blob" }).pipe(
      map((response: any) => {
        const blob = new Blob([response], { type: "application/pdf" });
        return {
          Result: blob,
          Status: true
        };
      }),
      catchError((error: Response) => {
        return this.handleExceptions(error);
      })
    );
  }

  deleteData(data: any, route: string) {
    const path = this.buildFullPath(route);
    return this.http.delete(path, data).pipe(
      map((response: any) => {
        const result = response;
        if (!result.status) {
          this.handleValidationErrors();
        }
        return result;
      }),
      catchError((error: Response) => {
        return this.handleExceptions(error);
      })
    );
  }

  handleExceptions(res: any) {
    console.log("AJAX SERVICE -- handleExceptions",res);
    const errorMessage = {
      status: res.status,
      errorMessage: res.error.message
    };
    return throwError(errorMessage);
  }

  handleValidationErrors() {
    console.log("AJAX SERVICE --- handleValidationErrors");
  }

}
