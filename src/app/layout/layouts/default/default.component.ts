import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { Utilisateur } from '@core/models/utilisateur.model';
import { NavigationService } from '@core/navigation/navigation.service';
import { UtilisateurService } from '@core/services/utilsateur/utilisateur.service';
import {
    FuseNavigationItem,
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
    selector: 'default-layout',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigations: FuseNavigationItem[];
    user: Utilisateur;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _authService: AuthService,
        private _userService: UtilisateurService,
        private _router: Router,
        private _navigationService: NavigationService,
        private _confirmationService: FuseConfirmationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService
    ) {}

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    ngOnInit(): void {
        this.user = this._userService.currentUser;
        // Subscribe to navigation data
        this._navigationService.navigations$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigations: FuseNavigationItem[]) => {
                this.navigations = navigations;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }

    logout(): void {
        this._confirmationService
            .open({
                message: 'Voulez-vous vous déconnecter',
                actions: {
                    confirm: { label: 'Oui', color: 'primary' },
                    cancel: { label: 'Non' },
                },
            })
            .afterClosed()
            .subscribe((res) => {
                if (res === 'confirmed') {
                    this._authService.signOut().subscribe(() => {
                        this._router.navigate(['/sign-in']);
                    });
                }
            });
    }
}
