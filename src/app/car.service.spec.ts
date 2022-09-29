import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { CarService } from './car.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { Car } from './models/car';
import { HttpErrorResponse } from '@angular/common/http';

describe('CarService', () => {
  let service: CarService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ HttpClientTestingModule ] });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  
  it('should return cars', inject([CarService], fakeAsync((service: CarService) => { 
    let cars: Car[] = []; 
    let testCars:Car[]=[
      {
        "doors": 2,
        "make": "Tesla",
        "model": "Roadster",
        "price": 120000,
        "year": 2017
        },
        {
        "doors": 2,
        "make": "Ferrari",
        "model": "F40",
        "price": 500000,
        "year": 2017
        },
        {
        "doors": 3,
        "make": "Daimler AG",
        "model": "Smart C453",
        "price": 16000,
        "year": 2016
        },
        {
        "doors": 5,
        "make": "Chrysler",
        "model": "Pacifica Hybrid",
        "price": 40000,
        "year": 2018
        }
    ]
    service.getCars() .subscribe(data => cars = data); 
    const req = httpTestingController.expectOne( 'http://localhost:8080/CarService/jaxrs/cars'); 
    // Assert that the request is a GET.
     expect(req.request.method).toEqual('GET');
      // Respond with mock data, causing Observable to resolve. 
      req.flush(testCars); 
      // Assert that there are no outstanding requests.
       httpTestingController.verify(); 
       // Cause all Observables to complete and check the results
        tick(); 
        expect(cars[0].doors).toBe(2); })));

//


  
it('should return top 3 cars', inject([CarService], fakeAsync((service: CarService) => { 
  let cars: Car[] = []; 
  let testCars:Car[]=[
    {
      "doors": 2,
      "make": "Ferrari",
      "model": "F40",
      "price": 500000,
      "year": 2017
      },
      {
      "doors": 2,
      "make": "Tesla",
      "model": "Roadster",
      "price": 120000,
      "year": 2017
      },
      {
      "doors": 5,
      "make": "Chrysler",
      "model": "Pacifica Hybrid",
      "price": 40000,
      "year": 2018
      }
  ]
  service.getCarsByPrice() .subscribe(data => cars = data); 
  const req = httpTestingController.expectOne( 'http://localhost:8080/CarService/jaxrs/cars/?filter=price'); 
  // Assert that the request is a GET.
   expect(req.request.method).toEqual('GET');
    // Respond with mock data, causing Observable to resolve. 
    req.flush(testCars); 
    // Assert that there are no outstanding requests.
     httpTestingController.verify(); 
     // Cause all Observables to complete and check the results
      tick(); 
      expect(cars[0].doors).toBe(2); })));

 // Testing Err handling from service.ts file
 it('should handle a 404 error', inject([CarService], fakeAsync((service: CarService) => { 
  let errorResp: HttpErrorResponse;
  let errorReply: string = ''; 
  const errorHandlerSpy = spyOn(service, 'handleError').and.callThrough();
  service.getCars().subscribe({next: () => fail('Should not succeed'), error: (e) => errorReply = e});
  const req = httpTestingController.expectOne(service.url); 
  // Assert that the request is a GET.
   expect(req.request.method).toEqual('GET');
  // Respond with error
  req.flush('Forced 404', { status: 404, statusText: 'Not Found' }); 
  // Assert that there are no outstanding requests.
  httpTestingController.verify(); // Cause all Observables to complete and check the results 
  tick(); 
  expect(errorReply).toBe( 'Unable to contact service; please try again later.');
  expect(errorHandlerSpy).toHaveBeenCalled(); 
  errorResp = errorHandlerSpy.calls.argsFor(0)[0];
  expect(errorResp.status).toBe(404); 
      
  })));

  //test for getCarsByPrice
  
    
});
