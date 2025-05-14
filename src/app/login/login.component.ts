import { Component } from '@angular/core';
import * as companyData from '../../assets/companyData.json'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  Login(): void
  {
    console.log("This is the login function");

    // try{
    //   var responseFromFetch = await fetch(companyData.Login_URL);
    //   if(responseFromFetch.ok)
    //   {
    //     console.log("Response ok");
    //   }
    // }
    // catch(error:any){
    //   //
    // }
  }
}
