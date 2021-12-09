import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { Admin } from 'src/app/classes/admin';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: Admin = new Admin();

  constructor(private router: Router, public guard: AuthGuard) {}

  ngOnInit(): void {}

  logout(): void {
    console.log('logout');
    sessionStorage.removeItem('connected');
    this.router.navigate(['login']);
    sessionStorage.removeItem('user');
    //ChangeDetectorRef.detectChanges()
  }
}
