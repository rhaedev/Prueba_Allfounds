import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './pages/content/content.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'news'},  
  { path: 'news', component: ContentComponent},  
  { path: 'archived', component: ContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
