import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './pages/home/home.component';
import {AppMainComponent} from './app.main.component';
import {LoginComponent} from './pages/login/login.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: HomeComponent},
                ]
            },
            {path: 'login', component: LoginComponent},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
