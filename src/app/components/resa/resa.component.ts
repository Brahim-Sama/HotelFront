import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/classes/client';
import { Hotel } from 'src/app/classes/hotel';
import { Resa } from 'src/app/classes/resa';
import { ClientService } from 'src/app/services/client/client.service';
import { ConfigService } from 'src/app/services/config.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { ResaService } from 'src/app/services/resa/resa.service';

@Component({
  selector: 'app-resa',
  templateUrl: './resa.component.html',
  styleUrls: ['./resa.component.css'],
  providers: [ConfigService],
})
export class ResaComponent implements OnInit {
  resa: Resa = new Resa();
  resaRdv: Array<any> = [];

  clients: Array<Client> = [];
  hotels: Array<Hotel> = [];

  resas: Array<Resa> = [];
  errorMessage: string = '';
  success: boolean = false;

  @ViewChild('closebutton') closebuttonelement: any;

  constructor(
    private rs: ResaService,
    private hs: HotelService,
    private cs: ClientService,
    public config: ConfigService
  ) {}

  ngOnInit(): void {
    this.reloadResas();

    this.hs.getAll().subscribe({
      next: (data) => {
        this.hotels = data;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });

    this.cs.getAll().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  reloadResas() {
    this.rs.getAll().subscribe((data) => {
      this.resas = data;
    });
  }

  delete(id: number | undefined): void {
    if (confirm('Êtes vous sur ?')) {
      this.rs.delete(id).subscribe((data) => {
        this.reloadResas();
      });
    }
  }

  editResa(id: number | undefined): void {
    this.rs.getById(id).subscribe((data) => {
      this.resa = data;
    });
  }

  submitResa(): void {
    let obs: Observable<any>;
    if (this.resa.id == undefined) {
      // Ajout
      obs = this.rs.add(this.resa);
    } else {
      // Edition
      obs = this.rs.update(this.resa);
    }

    obs.subscribe({
      next: () => {
        this.reloadResas();
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
    this.resa = new Resa();
  }

  checkHotel(h1: Hotel, h2: Hotel): boolean {
    return h1 != undefined && h2 != undefined && h1.id == h2.id;
  }

  checkClient(c1: Client, c2: Client): boolean {
    return c1 != undefined && c2 != undefined && c1.id == c2.id;
  }
}
