import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '@core/models/utilisateur.model';
import { UtilisateurService } from '@core/services/utilsateur/utilisateur.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-utilisateur-list',
    templateUrl: './utilisateur-list.component.html',
    styleUrls: ['./utilisateur-list.component.scss'],
})
export class UtilisateurListComponent implements OnInit {
    formOpened = false;
    users$: Observable<Utilisateur[]>;
    userSelected: Utilisateur;

    search = '';

    constructor(private _utilisateurService: UtilisateurService) {}

    ngOnInit(): void {
        this.loadUtilisateurs();
    }

    onOpenForm(user?: Utilisateur): void {
        this.userSelected = user;
        this.formOpened = true;
    }

    onCloseForm(event: boolean): void {
        this.formOpened = false;
        this.userSelected = null;
        if (event) {
            this.loadUtilisateurs();
        }
    }

    loadUtilisateurs(): void {
        this.users$ = this._utilisateurService.getAll();
    }
}
