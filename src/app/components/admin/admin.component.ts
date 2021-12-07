import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/classes/admin';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  admin: Admin = new Admin();
  admins: Array<Admin> = [];
  errorMessage: string = '';
  success: boolean = false;

  @ViewChild('closebutton') closebuttonelement: any;

  constructor(private as: AdminService, public config: ConfigService) {}

  ngOnInit(): void {
    this.reloadClients();

    this.as.getAll().subscribe({
      next: (data) => {
        this.admins = data;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  reloadClients() {
    console.log(this.config.httpOptions.headers);
    this.as.getAll().subscribe((data) => {
      this.admins = data;
    });
  }

  delete(id: number | undefined): void {
    if (confirm('Êtes vous sur ?')) {
      this.as.delete(id).subscribe((data) => {
        this.reloadClients();
      });
    }
  }

  editClient(id: number | undefined): void {
    this.as.getById(id).subscribe((data) => {
      this.admin = data;
    });
  }

  submitClient(): void {
    let obs: Observable<any>;
    if (this.admin.id == undefined) {
      // Ajout
      obs = this.as.add(this.admin);
    } else {
      // Edition
      obs = this.as.update(this.admin);
    }

    obs.subscribe({
      next: () => {
        this.reloadClients();
        this.closebuttonelement.nativeElement.click();
        this.success = true;
        setTimeout(() => {
          // <<<---using ()=> syntax
          this.success = false;
        }, 5000);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });
  }

  reset(): void {
    this.errorMessage = '';
    this.admin = new Admin();
  }
}
