import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../bookstore/services/auth.service";
import {TokenStorageService} from "../../bookstore/services/token-storage.service";
import {Router} from "@angular/router";
import {LoginRequest} from "../../bookstore/dto/login-request.model";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm = new FormGroup({
    username: new FormControl<string | undefined>(undefined),
    password: new FormControl<string | undefined>(undefined)
  })

  constructor(private authService: AuthService, private tokenStorageService:TokenStorageService, private router:Router) { }

  ngOnInit(): void {
  }

  public signIn() {
    const loginRequest:LoginRequest = new LoginRequest({
      username: this.signInForm.controls.username.value!,
      password: this.signInForm.controls.password.value!,
    })
    console.log(loginRequest);
    this.authService.authenticate(loginRequest).subscribe({
        next: response => {
          console.log("X")
          console.log(response)
          this.tokenStorageService.saveToken(response.token)
          this.tokenStorageService.saveUser(response.token)
          alert("Success!");
          this.router.navigate(['']).then(
            ()=>{
              window.location.reload();
            }
          );
        },
        error: message => {
          console.log(message.Error)
          alert("There was an error while logging in, try again")
        }

      }
    )
  }

}
