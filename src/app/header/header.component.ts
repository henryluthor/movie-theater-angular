import { Component } from '@angular/core';
import * as companyData from '../../assets/companyData.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  companyName: string = companyData.companyName;
}
