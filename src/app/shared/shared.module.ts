import { DashboardComponent } from '../layouts/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { ShowNameComponent } from '../widgets/show-name/show-name.component';
import { CommonModule } from '@angular/common';
import { ToUpperCasePipe } from '../to-upper-case.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, ShowNameComponent, ToUpperCasePipe],
  imports: [CommonModule, FormsModule],
  exports: [
    DashboardComponent,
    ShowNameComponent,
    CommonModule,
    FormsModule,
    ToUpperCasePipe,
  ],
})
export class SharedModule {}
