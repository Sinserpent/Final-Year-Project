import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        loadComponent:() => import('../app/pages/landing/landing.component').then(m => m.LandingComponent)
    },
    {
      path:'questionform',
      pathMatch:'full',
      loadComponent:() => import('../app/pages/questionform/questionform.component').then(m=>m.QuestionformComponent)
    }


];
