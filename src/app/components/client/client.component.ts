import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { ConfigService } from 'src/app/services/config.service';
import { Client } from 'src/app/classes/client';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [ConfigService],
})
export class ClientComponent implements OnInit {
  client: Client = new Client();
  clientRdv: Array<any> = [];

  clients: Array<Client> = [];
  errorMessage: string = '';
  success: boolean = false;

  @ViewChild('closebutton') closebuttonelement: any;

  constructor(private cs: ClientService, public config: ConfigService) {}

  ngOnInit(): void {
    this.reloadClients();

    this.cs.getAll().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  reloadClients() {
    console.log(this.config.httpOptions.headers);
    this.cs.getAll().subscribe((data) => {
      this.clients = data;
    });
  }

  delete(id: number | undefined): void {
    if (confirm('Êtes vous sur ?')) {
      this.cs.delete(id).subscribe((data) => {
        this.reloadClients();
      });
    }
  }

  editClient(id: number | undefined): void {
    this.cs.getById(id).subscribe((data) => {
      this.client = data;
    });
  }

  submitClient(): void {
    let obs: Observable<any>;
    if (this.client.id == undefined) {
      // Ajout
      obs = this.cs.add(this.client);
    } else {
      // Edition
      obs = this.cs.update(this.client);
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
    this.client = new Client();
  }
}
