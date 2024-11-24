import { Component } from '@angular/core';

const packageJson = require('../../../package.json')
export const angularVersion = packageJson.dependencies;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})


export class FooterComponent {

}
