import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserPageComponent } from './components/create-user-page/create-user-page.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AdminGuard } from './guards/admin.guard';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'create/user',
    component: CreateUserPageComponent,
    canActivate: [AdminGuard],
  },
  { path: 'login', component: LoginComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
