import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    public token: string;
    private headers: HttpHeaders;
    private readonly apiUrl = environment.apiUrl;
    private readonly baseUrl = environment.baseUrl;



    constructor(private http: HttpClient) {
        //append headers
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
   }




     Register(name: string, email: string, password: string): Observable<any> {
        return this.http.post(this.apiUrl+'/register', { email: email, name: name, 
                password: password }, { headers: this.headers } )
            .pipe(
                map((response: Response) => {
                    // register successful if there's a jwt token in the response
                    this.token = response['token'];
                    let email = response['email'];
                    if (this.token) {
                        // store email and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('user', 
                            JSON.stringify({ email: email, token: this.token }));
                    }
                    return response;
                })
            );
    }





}
