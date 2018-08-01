import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharePlatform } from './sharePlatform.component';

const routes: Routes = [
    {
        path: '',
        component: SharePlatform
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class SharePlatformRoutingModule {

}