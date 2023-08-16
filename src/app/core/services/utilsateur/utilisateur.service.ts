import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from '@core/models/utilisateur.model';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const API_URL = environment.apiUrl + '/utilisateurs';

@Injectable({
    providedIn: 'root',
})
export class UtilisateurService {
    private _user: BehaviorSubject<Utilisateur> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) {}

    get currentUser(): Utilisateur {
        return this._user.getValue();
    }

    get(): Observable<Utilisateur> {
        return this._httpClient
            .get<Utilisateur>(`${environment.apiUrl}/mon-profil`)
            .pipe(tap((res: Utilisateur) => this._user.next(res)));
    }

    getAll(): Observable<Utilisateur[]> {
        return this._httpClient.get<Utilisateur[]>(API_URL);
    }

    createUser(user: Utilisateur): Observable<Utilisateur> {
        return this._httpClient.post<Utilisateur>(API_URL, user);
    }

    updateUser(user: Utilisateur): Observable<Utilisateur> {
        return this._httpClient.put<Utilisateur>(API_URL, user);
    }

    getById(id: number): Observable<Utilisateur> {
        return this._httpClient.get<Utilisateur>(`${API_URL}/${id}`);
    }
}
