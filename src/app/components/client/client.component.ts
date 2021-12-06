import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { ConfigService } from 'src/app/services/config.service';
import { Client } from 'src/app/classes/client';

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
    this.cs.getAll().subscribe(
      (data) => {
        this.clients = data;
      }
      //, err => console.log( "Une erreur est survenue" )
    );
  }
}
