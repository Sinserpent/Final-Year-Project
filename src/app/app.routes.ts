import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        loadComponent:() => import('../app/pages/landing/landing.component').then(m => m.LandingComponent)
    },
    {
        path:'login',
        pathMatch:'full',
        loadComponent:() => import('../app/auth/login/login.component').then(m=>m.LoginComponent),
    },
    {
        path:'signup',
        pathMatch:'full',
        loadComponent:() => import('../app/auth/signup/signup.component').then(m=>m.SignupComponent)
    },
    {
        path:'recruiter',
        pathMatch:'full',
        loadComponent:() => import('../app/roles/recruiter/recruiter.component').then(m=>m.RecruiterComponent)
    },
    {
        path:'recruitee',
        pathMatch:'full',
        loadComponent:() => import('../app/roles/recruitee/recruitee.component').then(m=>m.RecruiteeComponent)
    }
    ,{
        path:'interview',
        pathMatch:'full',
        loadComponent:() => import('../app/pages/interview/interview.component').then(m=>m.InterviewComponent)
    },
    {
        path:'analyze',
        pathMatch:'full',
        loadComponent:() => import('../app/pages/analyzer/analyzer.component').then(m=>m.AnalyzerComponent)
    },
    {
        path:'swapper',
        pathMatch:'full',
        loadComponent:() => import('../app/pages/template-swapper/template-swapper.component').then(m=>m.TemplateSwapperComponent)
    },
    {
        path:'connect',
        pathMatch:'full',
        loadComponent:() => import('../app/pages/connect/connect.component').then(m=>m.ConnectComponent)
    }

];