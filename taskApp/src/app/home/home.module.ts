import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HomePage  // ✅ standalone komponenta se IMPORTUJE
  ],
})
export class HomePageModule {}
