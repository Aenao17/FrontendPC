import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    },
    {
        path: 'signup',
        loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
    },
    {
        path: 'event',
        loadChildren: () => import('./pages/event/event.module').then(m => m.EventPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'event/:id',
        loadChildren: () => import('./pages/event/event.module').then(m => m.EventPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'add-event',
        loadChildren: () => import('./pages/add-event/add-event.module').then( m => m.AddEventPageModule),
        canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
