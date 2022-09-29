export default class CarPage{

    navigate(){
        cy.visit('/')
    }
    getCarTitle(){
        cy.get('app-car-list p').contains('car-list works!')
    }

    ClickToGetAllcars() { 
        cy.get('app-car-list button').contains('Get All cars').click(); 
    }

    clickToGetTopThreeCars(){
        cy.get('app-car-list button').contains('Get top Three cars').click(); 

    }
}

