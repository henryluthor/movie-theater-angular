import { Component } from '@angular/core';
import * as companyData from '../../assets/companyData.json'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  async Login(): Promise<void>
  {
    console.log("This is the login function");

    try{
      var responseFromFetch = await fetch(companyData.Login_URL, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          email: "admin@gmail.com",
          password: "admin"
        })
      });
      var responseFromFetchJson = await responseFromFetch.json();
      console.log("Response from fetch json:");
      console.log(responseFromFetch);
    }
    catch(error: any){
      console.error(error.message);
    }
  }
}
