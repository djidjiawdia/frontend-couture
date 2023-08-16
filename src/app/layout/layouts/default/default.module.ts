import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { SharedModule } from '@shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [DefaultComponent],
    imports: [
        CommonModule,
        AngularSvgIconModule.forRoot(),
        MatIconModule,
        RouterModule,
        FuseNavigationModule,
        SharedModule,
    ],
    exports: [DefaultComponent],
})
export class DefaultModule {}
