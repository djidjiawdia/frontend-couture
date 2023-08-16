import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '@core/models/utilisateur.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    constructor(private _httpClient: HttpClient) {}

    getAll(): Observable<Role[]> {
        return this._httpClient.get<Role[]>(`${environment.apiUrl}/roles`);
    }
}
