import { NgModule } from '@angular/core';
import { ClientComponent } from './client.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientMesureFormComponent } from './client-details/client-mesure-form/client-mesure-form.component';

const routes: Routes = [
    {
        path: '',
        component: ClientComponent,
        children: [
            {
                path: '',
                component: ClientListComponent,
            },
        ],
    },
];

@NgModule({
    declarations: [ClientComponent, ClientListComponent, ClientFormComponent, ClientDetailsComponent, ClientMesureFormComponent],
    imports: [SharedModule, MatRadioModule, RouterModule.forChild(routes)],
})
export class ClientModule {}
