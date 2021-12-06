import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/classes/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  hero: Dashboard = {
    id: 1,
    nom: 'Windstorm',
  };
}
