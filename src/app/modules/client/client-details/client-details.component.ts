import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from '@core/models/client.model';

@Component({
    selector: 'app-client-details',
    templateUrl: './client-details.component.html',
    styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent {
    @Input() client: Client;
    @Output() closeEvent = new EventEmitter();
}
