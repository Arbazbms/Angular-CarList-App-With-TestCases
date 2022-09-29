import { Car } from './car';

describe('Car', () => {
  it('should create an instance', () => {
    expect(new Car(12, 'asas','asa',23,23)).toBeTruthy();
  });
});
