import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { Car } from '../models/car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  carArr: Car[] = [];
  errorMessage: string = "";

  constructor(private carApi: CarService) { }
 
  getCars(){
    this.carApi.getCars().subscribe({
      next : (data) => {this.carArr = data;  this.errorMessage = '';},
      error: (e) => this.errorMessage = e
      
    })
  }

  getCarByPrice(){
    this.carApi.getCarsByPrice().subscribe((data) => {
      console.log('By price: ', data)
      this.carArr = data
    })
  }
  getAllCars(){
    this.getCars();
  }
  getTopThreeCars(){
    this.getCarByPrice()
  }

  ngOnInit(): void {
    this.getCars();

    setTimeout(() => {
    console.log('CARRARR: ', this.carArr)
    }, 6000);
  }
  


}
