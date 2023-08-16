import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { environment } from '@env/environment';
import { AuthType } from './auth.model';

@Injectable()
export class AuthService {
    private _authenticated: BehaviorSubject<boolean> = new BehaviorSubject(
        false
    );
    private _auth: BehaviorSubject<AuthType> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    get authenticated$(): Observable<boolean> {
        return this._authenticated.asObservable();
    }

    get auth$(): Observable<AuthType> {
        return this._auth.asObservable();
    }

    /**
     * Setter & getter for access token
     */
    get accessToken(): string {
        return localStorage.getItem('coutureToken') ?? '';
    }

    set accessToken(token: string) {
        localStorage.setItem('coutureToken', token);
    }

    set authenticated(value: boolean) {
        this._authenticated.next(value);
    }

    set auth(value: AuthType) {
        this._auth.next(value);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    signIn(credentials: { login: string; password: string }): Observable<any> {
        return this._httpClient
            .post(`${environment.apiUrl}/authenticate`, credentials)
            .pipe(
                switchMap((response: any) => {
                    const user: AuthType = AuthUtils.decodeToken(
                        response.accessToken
                    );

                    if (user) {
                        // Store the access token in the local storage
                        this.accessToken = response.accessToken;
                        // Set the authenticated flag to true
                        this.authenticated = true;
                        this.auth = user;
                        return of(user);
                    }

                    return of(null);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('coutureToken');

        // Set the authenticated flag to false
        this.authenticated = false;

        // Return the observable
        return of(true);
    }

    getRoles(): string[] {
        const user: AuthType = AuthUtils.decodeToken(this.accessToken);
        return user.roles;
    }

    check(): Observable<boolean> {
        if (this.accessToken) {
            if (AuthUtils.isTokenExpired(this.accessToken)) {
                return of(false);
            }
            this._authenticated.next(true);
            return of(true);
        }
        return of(false);
    }
}
