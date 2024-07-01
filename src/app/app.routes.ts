import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FetchFilesComponent } from './fetch-files/fetch-files.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent , data:{random:0} },
    {path:'',component:LayoutComponent,
        children:[
            {path:'dashboard',component:DashboardComponent },
        ]
    },
    {path:'fetch',component:FetchFilesComponent},
    { path: 'register', component: RegisterComponent },
{ path: '**', redirectTo: '/login' }
];
  
