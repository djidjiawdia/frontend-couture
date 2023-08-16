import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mesure } from '@core/models/mesure.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl + '/mesures';

@Injectable({
    providedIn: 'root',
})
export class MesureService {
    constructor(private _httpClient: HttpClient) {}

    getByClient(idClient: number): Observable<Mesure> {
        return this._httpClient.get<Mesure>(`${API_URL}/client/${idClient}`);
    }

    addMesure(mesure: Mesure): Observable<number> {
        return this._httpClient.post<number>(API_URL, mesure);
    }

    updateMesure(mesure: Mesure): Observable<any> {
        return this._httpClient.put(API_URL, mesure);
    }
}
