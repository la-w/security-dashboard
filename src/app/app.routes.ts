import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FindingDetailComponent } from './components/finding-detail/finding-detail.component';
import { isAuthenticated } from './auth/routeGuard';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent , canActivate: [isAuthenticated]},
    { path: 'finding/:id', component: FindingDetailComponent , canActivate: [isAuthenticated]},
    {path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
