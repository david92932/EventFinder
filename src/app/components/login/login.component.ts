import { Component, OnInit } from '@angular/core';
import { LoginService} from '../../login.service';
import { Router} from '@angular/router';
import { MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  googleLogin() {
    console.log('login triggered');
    this.loginService.googleLoginService().subscribe((data) => {
      this.snackBar.open(data.toString(), 'OK', {duration: 4000});
      this.router.navigate(['/list']);
    });
  }

}
