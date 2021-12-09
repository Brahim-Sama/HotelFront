import { Component, OnInit, ViewChild } from '@angular/core';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { ConfigService } from 'src/app/services/config.service';
import { Hotel } from 'src/app/classes/hotel';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
  providers: [ConfigService],
})
export class HotelComponent implements OnInit {
  hotel: Hotel = new Hotel();
  hotelRdv: Array<any> = [];

  hotels: Array<Hotel> = [];
  errorMessage: string = '';
  success: boolean = false;

  @ViewChild('closebutton') closebuttonelement: any;

  constructor(private cs: HotelService, public config: ConfigService) {}

  ngOnInit(): void {
    this.reloadHotels();

    this.cs.getAll().subscribe({
      next: (data) => {
        this.hotels = data;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  reloadHotels() {
    console.log(this.config.httpOptions.headers);
    this.cs.getAll().subscribe((data) => {
      this.hotels = data;
    });
  }

  delete(id: number | undefined): void {
    if (confirm('Êtes vous sur ?')) {
      this.cs.delete(id).subscribe((data) => {
        this.reloadHotels();
      });
    }
  }

  editHotel(id: number | undefined): void {
    this.cs.getById(id).subscribe((data) => {
      this.hotel = data;
    });
  }

  submitHotel(): void {
    let obs: Observable<any>;
    if (this.hotel.id == undefined) {
      // Ajout
      obs = this.cs.add(this.hotel);
    } else {
      // Edition
      obs = this.cs.update(this.hotel);
    }

    obs.subscribe({
      next: () => {
        this.reloadHotels();
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
    this.hotel = new Hotel();
  }
}
