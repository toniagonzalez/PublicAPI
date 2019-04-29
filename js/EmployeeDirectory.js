class EmployeeDirectory {
  constructor(employees){
    this.employees = employees;
  }

  employeeCardsArray(){
   return this.employees.map((employee)=> {

     return employee.makeEmployeeCard();
    });
  }

  appendCardsToDOM(){
    $('#gallery').append(this.employeeCardsArray());
  }

  appendModalDetails(){
    for (let i=0; i< this.employees.length; i++){
      $('modal-info-container').append(this.employees[2]);
    }
  }


}
