import {ModuleWithProviders, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateCharityComponent } from './create-charity/create-charity.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DetailCharityViewComponent } from './detail-charity-view/detail-charity-view.component';
import { MyProfilePageComponent } from './my-profile-page/my-profile-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { EditCharityPageComponent } from './edit-charity-page/edit-charity-page.component';
import {CharityRepositoryService} from './services/charity-repository.service';
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {UserRepositoryService} from "./services/user-repository.service";
import {User} from "./models/User";


const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'create_charity',
      component: CreateCharityComponent
    },
    {
      path: 'home',
      component: HomePageComponent
    },
    {
      path: 'charity/:id',
      component: DetailCharityViewComponent
    },
    {
      path: 'profile/:username',
      component: MyProfilePageComponent
    },
    {
      path: 'error',
      component: PageNotFoundComponent
    },
    {
      path: 'search/:key',
      component: SearchPageComponent
    },
    {
      path: 'edit/:charityId',
      component: EditCharityPageComponent
    },
    {
      path: 'edit-profile/:username',
      component: EditProfileComponent
    },
    {
      path: '**',
      redirectTo: '/home',
      pathMatch: 'full'
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
