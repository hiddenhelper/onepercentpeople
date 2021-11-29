import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '@pages/errors/page-not-found/page-not-found.component';


const errorRoutes: Routes = [
  { path: '**', component: PageNotFoundComponent },
];

export default errorRoutes;


