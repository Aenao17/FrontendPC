import { NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

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
        canActivate: [LoginGuard]
    },
    {
        path: 'signup',
        loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule),
        canActivate: [LoginGuard]
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
  {
    path: 'post',
    loadChildren: () => import('./pages/post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
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
