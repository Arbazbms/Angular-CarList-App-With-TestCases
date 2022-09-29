import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CarService } from '../car.service';
import { Car } from '../models/car';

import { CarListComponent } from './car-list.component';

describe('CarListComponent', () => {


  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;

  beforeEach(async () => {
    let testCars:Car[] = [
      new Car(2, 'German', 'ferari', 1200, 2001),
      new Car(2, 'Iatlian', 'Audi', 1200, 1990),
    ]
    let carService:any = jasmine.createSpyObj('CarService', ['getCars', 'getCarsByPrice'])
    carService.getCars.and.returnValue(of(testCars))
    await TestBed.configureTestingModule({
      declarations: [ CarListComponent ],
      providers: [{ provide: CarService, useValue: carService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a table', () => {
    const compiled = fixture.debugElement.nativeElement;
    const table = compiled.querySelector('table');
    console.log(table);expect(table.children.length).toBe(2);
    // expect(table.rows[0].cells[0].textContent).toBe('The Lord of the Rings')
  });

      // testing err msg
    it('should display an error message', () => {
      let errorDiv = fixture.debugElement.nativeElement.querySelector('.error'); 
      expect(errorDiv).toBeFalsy();
      console.log("aaaaaaaaaaaa::::->", errorDiv)
      component.errorMessage = 'An error'; 
      fixture.detectChanges(); 
      errorDiv = fixture.debugElement.nativeElement.querySelector('.error'); 
      console.log("bbbbbbbbbbbbbbbbb::::->", errorDiv)

      expect(errorDiv).toBeTruthy(); 

    });
});
