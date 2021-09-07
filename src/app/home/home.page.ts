import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  weather: any;
  weatherClass: string;
  date: string;
  baseApi: string;
  keyApi: string;
  query: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.keyApi = '38fdcf84b125803f20c6a40aec0e900a';
    this.baseApi = 'https://api.openweathermap.org/data/2.5/';
    this.weatherClass = '';
  }

  getWeather(query) {
    this.http
      .get(
        `${this.baseApi}weather?q=${query}&units=metric&appid=${this.keyApi}`,
        {}
      )
      .subscribe(
        (resp) => {
          this.weather = resp;
          this.weatherClass = this.weather.main.temp > 18 ? 'hot' : 'cold';
        },
        (error) => {
          console.log(error);
        }
      );
  }

  isObj(val) {
    return typeof val === 'object';
  }

  onEnter() {
    this.getWeather(this.query);
  }
}
