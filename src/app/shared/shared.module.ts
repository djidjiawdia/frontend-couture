import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';

const LIST_MODULES = [
    // Fuse Modules
    FuseDrawerModule,

    // Angular Material Modules
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ...LIST_MODULES],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, ...LIST_MODULES],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }],
    declarations: [],
})
export class SharedModule {}
