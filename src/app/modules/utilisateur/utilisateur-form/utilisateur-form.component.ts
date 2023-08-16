import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role, Utilisateur } from '@core/models/utilisateur.model';
import { RoleService } from '@core/services/role/role.service';
import { UtilisateurService } from '@core/services/utilsateur/utilisateur.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-utilisateur-form',
    templateUrl: './utilisateur-form.component.html',
    styleUrls: ['./utilisateur-form.component.scss'],
})
export class UtilisateurFormComponent implements OnInit {
    @Input() user: Utilisateur;
    @Output() closeEvent = new EventEmitter();

    userForm: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        role: new FormControl(null, [Validators.required]),
    });
    roles$: Observable<Role[]>;
    title = 'Ajouter un utilisateur';
    isEdit = false;

    constructor(
        private _utilisateurService: UtilisateurService,
        private _roleService: RoleService,
        private _snackBar: MatSnackBar
    ) {}

    get f(): any {
        return this.userForm.controls;
    }

    ngOnInit(): void {
        this.roles$ = this._roleService.getAll();
        if (this.user) {
            this.title = "Modifier l'utilisateur";
            this.isEdit = true;
            this.userForm.patchValue({
                ...this.user,
            });
        }
    }

    onSubmit(): void {
        if (this.userForm.invalid) {
            return;
        }
        this.user = {
            ...this.user,
            ...this.userForm.value,
        };
        this.userForm.disable();
        if (this.isEdit) {
            this._utilisateurService.updateUser(this.user).subscribe({
                next: () => {
                    this.userForm.reset();
                    this._snackBar.open('Responsable modifié avec succès', '', {
                        panelClass: ['bg-amber-500', 'text-white'],
                        duration: 3500,
                    });
                    this.closeEvent.emit(true);
                },
                error: (err) => {
                    this.userForm.enable();
                },
            });
        } else {
            this._utilisateurService.createUser(this.user).subscribe({
                next: () => {
                    this._snackBar.open('Responsable ajouté avec succès', '', {
                        panelClass: ['bg-green-500', 'text-white'],
                        duration: 3500,
                    });
                    this.userForm.reset();
                    this.closeEvent.emit(true);
                },
                error: (err) => {
                    this.userForm.enable();
                },
            });
        }
    }

    onClose(): void {
        this.closeEvent.emit();
    }

    compareRole = (r1: Role, r2: Role): boolean => r1 === r2 || r1.id === r2.id;
}
