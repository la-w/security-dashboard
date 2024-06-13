import { NgModule } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
  ]
})
class AppModule {}
