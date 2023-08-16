import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { FuseNavigationItem } from '@fuse/components/navigation';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private _navigations: ReplaySubject<FuseNavigationItem[]> =
        new ReplaySubject<FuseNavigationItem[]>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigations$(): Observable<FuseNavigationItem[]> {
        return this._navigations.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<FuseNavigationItem[]> {
        return this._httpClient
            .get<FuseNavigationItem[]>('api/common/navigation')
            .pipe(
                tap((navigations) => {
                    this._navigations.next(navigations);
                })
            );
    }
}
