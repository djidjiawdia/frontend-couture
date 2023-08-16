import { Component, OnInit } from '@angular/core';
import { Client } from '@core/models/client.model';
import { ClientService } from '@core/services/client/client.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-client-list',
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
    formOpened = false;
    detailsOpened = false;
    clients$: Observable<Client[]>;
    clientSelected: Client;

    search = '';

    constructor(private _clientService: ClientService) {}

    ngOnInit(): void {
        this.loadClients();
    }

    onOpenForm(client?: Client): void {
        this.clientSelected = client;
        this.formOpened = true;
    }

    detailsClient(client: Client): void {
        this.clientSelected = client;
        this.detailsOpened = true;
    }

    onCloseForm(event: boolean): void {
        this.formOpened = false;
        this.clientSelected = null;
        if (event) {
            this.loadClients();
        }
    }

    loadClients(): void {
        this.clients$ = this._clientService.getAll();
    }
}
