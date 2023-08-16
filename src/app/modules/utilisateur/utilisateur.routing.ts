import { Routes } from '@angular/router';
import { UtilisateurComponent } from './utilisateur.component';
import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';

export const utilisateurRoutes: Routes = [
    {
        path: '',
        component: UtilisateurComponent,
        children: [
            {
                path: '',
                component: UtilisateurListComponent,
            },
        ],
    },
];
