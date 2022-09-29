import AppPage from "cypress/support/app.po"
import CarPage from "cypress/support/car.po";

describe('', ()=>{

    let app:AppPage;
    let car:CarPage
    beforeEach(()=>{
        app = new AppPage();
        car = new CarPage();
    })

    it('should get title of car-list page', ()=>{
        car.navigate();
        car.getCarTitle();
        car.ClickToGetAllcars();
        car.clickToGetTopThreeCars();

    })  

})