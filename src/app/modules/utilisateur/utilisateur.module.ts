import { NgModule } from '@angular/core';
import { UtilisateurComponent } from './utilisateur.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { utilisateurRoutes } from './utilisateur.routing';
import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';
import { UtilisateurFormComponent } from './utilisateur-form/utilisateur-form.component';

@NgModule({
    declarations: [UtilisateurComponent, UtilisateurListComponent, UtilisateurFormComponent],
    imports: [SharedModule, RouterModule.forChild(utilisateurRoutes)],
})
export class UtilisateurModule {}
