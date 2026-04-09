import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TeaCardComponent } from './tea-card/tea-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TeaCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    TeaCardComponent
  ]
})
export class SharedModule { }
