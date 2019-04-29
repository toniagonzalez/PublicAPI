//----- Search Bar Variables----//
let cards = document.getElementsByClassName('card');

// Create Form Element
const form = document.createElement('FORM');
form.method = 'GET';
form.action = '#';

// Create Searchbar Element
const searchBar = document.createElement('INPUT');
searchBar.type = 'search';
searchBar.id = 'search-input';
searchBar.className = 'search-input';
searchBar.name = 'q';
searchBar.placeholder = 'Search for Employees';

//Create Submit Input
const submit = document.createElement('INPUT');
submit.setAttribute('type', 'submit');
submit.id = 'search-submit';
submit.value = 	'\ud83d\udd0d';
submit.className = 'search-submit';

// Create Searchbar & Submit Labels for W3C Accessibility
const searchLabel = document.createElement('LABEL');
searchLabel.setAttribute('for', 'search-input');
searchLabel.innerText = 'Search for Employees';
searchLabel.className = 'visuallyhidden';

const submitLabel = document.createElement('LABEL');
submitLabel.setAttribute('for', 'search-submit');
submitLabel.innerText = 'Submit Search';
submitLabel.className = 'visuallyhidden';

//Append Searchbar elements to the DOM
const searchContainer = $('.search-container');
form.append(searchLabel);
form.append(searchBar);
form.append(submitLabel);
form.append(submit);
searchContainer.append(form);


//Prevent Form from submiting on click in Firefox Browser
$(form).submit(function(e) {
    e.preventDefault();
});


//Create an array for visible cards
function visibleCards(){
  let visibleCards = Array.from(cards).filter(card => {
    return card.className !== 'card hidden';
  });
  return visibleCards;
}


//Create an array for Employee Details for Visible cards
function detailArray(){
  visibleCards();
  let detailArray =  directory.employees.filter(emp => {
    for(let i=0; i<visibleCards().length; i++){
      if (visibleCards()[i].innerText.toLowerCase().includes(emp.lastName && emp.firstName)){
          return emp;
      }
    }
  });
  return detailArray;
}


//-----------------Listeners---------------//
//--Listener for Submit button
$('.search-container').on('click', 'input', function(e) {
  for (let i=0; i< cards.length; i++){
    let displayedCard = cards[i].style.display = 'inherit';
    if (cards[i].innerText.toLowerCase().includes(searchBar.value.toLowerCase())){
      cards[i].style.display = 'inherit';
      cards[i].classList.remove('hidden');
    }else {
      cards[i].style.display = 'none';
      cards[i].classList.add('hidden');
    }

    if(searchBar.value === '' && searchBar.activeElement) {
      cards[i].style.display = 'inherit';
      cards[i].classList.remove('hidden');
    }
  }
});


let currentIndex;
//--Listener for Directory Cards
$('#gallery').on('click', 'div.card', function(e) {
  visibleCards();
  detailArray();
  currentIndex =  visibleCards().indexOf(this);
  //--Add Detail info to modal
  $('.modal-info-container').html(detailArray()[currentIndex].employeeModalDetail());
  $('.modal-container').show();
});



//--Listener Modal 'Close' Button
$(document).on('click', '#modal-close-btn', function(e){
  $('.modal-container').hide();
});


//--Listener Modal 'Next' Button
$(document).on('click', '#modal-next', function(e){
  let index;
  if (currentIndex <(visibleCards().length - 1) && currentIndex >= 0){
    index = currentIndex += 1;
  }
  else if(currentIndex === (visibleCards().length -1)){
    currentIndex = -1;
    index = currentIndex += 1;
  }
  //--Add Detail info to modal
  $('.modal-info-container').html(detailArray()[index].employeeModalDetail());
});


//--Listener Modal 'Previous' Button
$(document).on('click', '#modal-prev', function(e) {
  let index;
  if (currentIndex <=visibleCards().length && currentIndex >= 1){
    index = currentIndex -= 1;
  }
  else if(currentIndex === 0){
    currentIndex = visibleCards().length;
    index = currentIndex -= 1;
  }
  //--Add Detail info to modal
  $('.modal-info-container').html(detailArray()[index].employeeModalDetail());
});


let directory;
//------Fetch Request & Promises--------//
fetch('https://randomuser.me/api?results=12&nat=US&inc=name,location,email,picture,dob,phone&exc=login,gender,registered,dob.age<20,id,cell,info&noinfo')
  .then(response => {
    return response.json();
  })
  .then(data=> {
    let employeeData = data.results;
    let employees = makeEmployeeArray(employeeData);
    directory = new EmployeeDirectory(employees);
    return directory;
  })
  .then((directory)=>{
    directory.appendCardsToDOM();
    appendModalToDOM();
  });


//----Helper Functions
function makeEmployeeArray(results){
  let employeeList = results.map((employee)=> {
   return new Employee(
    employee.picture.large,
    employee.name.first,
    employee.name.last,
    employee.email,
    employee.dob.date,
    employee.location.city,
    employee.location.state,
    employee.location.street,
    employee.phone,
    employee.location.postcode)
  });
  return employeeList;
}


function appendModalToDOM(){
  let modal = '';
  modal+= '<div class="modal-container">';
  modal+= '<div class="modal">';
  modal+= '<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>';
  modal+= '<div class="modal-info-container">';
  modal+= '</div>';
  modal+= '</div>';
  modal+= '<div class="modal-btn-container">';
  modal+= '<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>';
  modal+= '<button type="button" id="modal-next" class="modal-next btn">Next</button>';
  modal+= '</div>';
 $('body').append(modal);
 $('.modal-container').hide();
}
