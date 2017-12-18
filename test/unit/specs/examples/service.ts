import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AccountModel } from '../models/account.model';
import { environment } from '@env/environment';

export { AccountModel };

@Injectable()
export class AccountService {
    private _baseUrl: string = environment.apiUrl + '/customer';

    private _account$: BehaviorSubject<AccountModel> = new BehaviorSubject(null);

    constructor(private http: Http) {
    }

    public get account$(): Observable<AccountModel> {
        return this._account$.asObservable();
    }

    public load(): Observable<AccountModel> {

        return this.http.get(this._baseUrl)
            .map((res) => {
                if (+res.headers.get('status') !== 200) {
                    return null;
                }

                const model = new AccountModel(res.json());
                this._account$.next(model);

                return model;
            });

    }

    public save(acc: AccountModel) {
        return this.http.put(this._baseUrl, acc.toJS())
            .map((res) => {
                return new AccountModel(res.json());
            })
            .map((model: AccountModel) => {
                this._account$.next(model);
                return model;
            });
    }

    public isLoggedIn(): boolean {
        const acc = this._account$.getValue();
        return acc ? true : false;
    }

    public hasAccess(capability): boolean {
        const acc = this._account$.getValue();
        return acc.hasAccess(capability);
    }

    public isLoggedIn$(): Observable<boolean> {
        return this._account$
            .map((acc) => {
                return acc ? true : false;
            });
    }

    public blobToBase64(blob: any): Observable<string> {
        return Observable.create((obs) => {
            const reader = new FileReader();
            reader.onload = () => {
                obs.next(reader.result);
                obs.complete();
            };

            reader.readAsDataURL(blob);
        });
    }

    public login(login, password): Observable<AccountModel> {
        return this.http.post(environment.apiUrl + '/login', {
            login: login,
            password: password
        }).map((res) => {
            const acc = new AccountModel(res.json());
            this._account$.next(acc);

            return acc;
        });
    }

    public clearSession(): void {
        this._account$.next(null);
    }

    public logout(): Observable<Response> {
        return this.http.post(environment.apiUrl + '/logout', {}).map((res) => {
            this._account$.next(null);
            return res;
        });
    }
}
