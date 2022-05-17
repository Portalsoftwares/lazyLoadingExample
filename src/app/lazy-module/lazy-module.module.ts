import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyComponentComponent } from './lazy-component/lazy-component.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LazyComponentComponent],
  imports: [CommonModule, SharedModule],
  exports: [LazyComponentComponent],
})
export class LazyModuleModule {}
