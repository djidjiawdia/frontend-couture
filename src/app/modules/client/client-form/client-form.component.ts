import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from '@core/models/client.model';
import { ClientService } from '@core/services/client/client.service';

@Component({
    selector: 'app-client-form',
    templateUrl: './client-form.component.html',
    styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
    @Input() client: Client;
    @Output() closeEvent = new EventEmitter();

    clientForm: FormGroup = new FormGroup({
        prenom: new FormControl('', [Validators.required]),
        nom: new FormControl('', [Validators.required]),
        telephone: new FormControl('', [Validators.required]),
        cni: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        sexe: new FormControl(null, [Validators.required]),
    });
    title = 'Ajouter un client';
    isEdit = false;

    constructor(
        private _clientService: ClientService,
        private _snackBar: MatSnackBar
    ) {}

    get f(): any {
        return this.clientForm.controls;
    }

    ngOnInit(): void {
        if (this.client) {
            this.title = 'Modifier le client';
            this.isEdit = true;
            this.clientForm.patchValue({
                ...this.client,
            });
        }
    }

    onSubmit(): void {
        if (this.clientForm.invalid) {
            return;
        }
        this.client = {
            ...this.client,
            ...this.clientForm.value,
        };
        this.clientForm.disable();
        if (this.isEdit) {
            this._clientService.updateClient(this.client).subscribe({
                next: () => {
                    this.clientForm.reset();
                    this._snackBar.open('Responsable modifié avec succès', '', {
                        panelClass: ['bg-amber-500', 'text-white'],
                        duration: 3500,
                    });
                    this.closeEvent.emit(true);
                },
                error: (err) => {
                    this.clientForm.enable();
                },
            });
        } else {
            this._clientService.saveClient(this.client).subscribe({
                next: () => {
                    this._snackBar.open('Responsable ajouté avec succès', '', {
                        panelClass: ['bg-green-500', 'text-white'],
                        duration: 3500,
                    });
                    this.clientForm.reset();
                    this.closeEvent.emit(true);
                },
                error: (err) => {
                    this.clientForm.enable();
                },
            });
        }
    }

    onClose(): void {
        this.closeEvent.emit();
    }
}
