import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {


  constructor(private authService: AuthenticationService, private router: Router){}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  hideVerticalNavbar = false;
  toggleVerticalNavbar(): void {
    this.hideVerticalNavbar = !this.hideVerticalNavbar;
  }


}
