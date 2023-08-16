import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '@core/models/client.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl + '/clients';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    constructor(private _httpClient: HttpClient) {}

    getAll(): Observable<Client[]> {
        return this._httpClient.get<Client[]>(API_URL);
    }

    saveClient(client: Client): Observable<number> {
        return this._httpClient.post<number>(API_URL, client);
    }

    updateClient(client: Client): Observable<number> {
        return this._httpClient.put<number>(API_URL, client);
    }

    delete(id: number): Observable<any> {
        return this._httpClient.delete(`${API_URL}/${id}`);
    }
}
