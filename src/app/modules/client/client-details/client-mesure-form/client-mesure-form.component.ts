import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from '@core/models/client.model';
import { Mesure } from '@core/models/mesure.model';
import { MesureService } from '@core/services/mesure/mesure.service';

@Component({
    selector: 'app-client-mesure-form',
    templateUrl: './client-mesure-form.component.html',
    styleUrls: ['./client-mesure-form.component.scss'],
})
export class ClientMesureFormComponent implements OnInit {
    @Input() client: Client;
    mesure: Mesure;
    isEdit = false;

    mesureForm: FormGroup = new FormGroup({
        tete: new FormControl(null, [Validators.required]),
        cou: new FormControl(null, [Validators.required]),
        epaule: new FormControl(null, [Validators.required]),
        poitrine: new FormControl(null, [Validators.required]),
        hanches: new FormControl(null, [Validators.required]),
        cuisse: new FormControl(null, [Validators.required]),
        genou: new FormControl(null, [Validators.required]),
        mollet: new FormControl(null, [Validators.required]),
        cheville: new FormControl(null, [Validators.required]),
        biceps: new FormControl(null, [Validators.required]),
        coude: new FormControl(null, [Validators.required]),
        avantBras: new FormControl(null, [Validators.required]),
        entreJambe: new FormControl(null, [Validators.required]),
        lBras: new FormControl(null, [Validators.required]),
        lCorps: new FormControl(null, [Validators.required]),
        hTotal: new FormControl(null, [Validators.required]),
    });

    constructor(private _mesureService: MesureService) {}

    ngOnInit(): void {
        if (this.client.sexe === 'FEMME') {
            this.mesureForm.addControl(
                'mesureFemme',
                new FormGroup({
                    dessousPoit: new FormControl(null, [
                        Validators.required,
                        Validators.min(0),
                    ]),
                    crestesIliaque: new FormControl(null, [
                        Validators.required,
                        Validators.min(0),
                    ]),
                    ldos: new FormControl(null, [
                        Validators.required,
                        Validators.min(0),
                    ]),
                })
            );
        }
        this._mesureService
            .getByClient(this.client.id)
            .subscribe((res: Mesure) => {
                this.mesure = res;
                this.isEdit = true;
                this.mesureForm.patchValue(res);
                this.mesureForm.disable();
            });
    }

    onSave(): void {
        if (this.mesureForm.invalid) {
            return;
        }
        this.mesure = {
            ...this.mesure,
            ...this.mesureForm.value,
            client: this.client,
        };
        if (this.isEdit) {
            //  console.log('edit');
            this._mesureService.updateMesure(this.mesure).subscribe(() => {
                alert('Enregistrement effectué avec succès');
                this.mesureForm.disable();
            });
        } else {
            this._mesureService.addMesure(this.mesure).subscribe((res) => {
                if (res) {
                    alert('Enregistrement effectué avec succès');
                    this.mesureForm.disable();
                    this.isEdit = true;
                }
            });
        }
    }

    cancel(): void {
        this.mesureForm.patchValue(this.mesure);
        this.mesureForm.disable();
    }
}
