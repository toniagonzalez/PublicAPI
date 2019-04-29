class Employee {
  constructor(image, firstName, lastName, email, birthday, city, state, address, phone, zip, id){
    this.image = image;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthday = birthday;
    this.city = city;
    this.state = state;
    this.address = address;
    this.phone = phone;
    this.zip = zip;
    this.id = id;
  }

  convertBirthday(){
    const regex = /\d{4}\-\d{2}\-\d{2}/;
    let str = this.birthday;
    let birthdayString = regex.exec(str);
    let birthDate = birthdayString[0].split('-');
    let birthday = birthDate[1] + "/" + birthDate[2] + "/" + birthDate[0];
    return birthday;
  }

  makeEmployeeCard(){
    let employeeCard = '';
    employeeCard += `<div class="card" id="${this.id}">`;
    employeeCard += `<div class="card-img-container">`;
    employeeCard += `<img class="card-img" src=${this.image} alt="${this.firstName} ${this.lastName} profile picture">
        </div>`;
    employeeCard += `<div class="card-info-container">`;
    employeeCard += `<h3 class="card-name cap">${this.firstName} ${this.lastName}</h3>`;
    employeeCard += `<p class="card-text">${this.email}</p>`;
    employeeCard += `<p class="card-text cap">${this.city}, ${this.abbreviateState()}</p>`;
    employeeCard += `</div>`;
    employeeCard += `</div>`;
    return employeeCard;
  }

  employeeModalDetail(){
    let modalDetail = '';
    modalDetail += `<img class="modal-img" src=${this.image} alt="profile picture">`;
    modalDetail += `<h3 id="${this.id}" class="modal-name cap">${this.firstName} ${this.lastName}</h3>`;
    modalDetail += `<p class="modal-text">${this.email}</p>`;
    modalDetail += `<p class="modal-text cap">${this.city}</p>`;
    modalDetail += `<hr><p class="modal-text">${this.phone}</p>`;
    modalDetail += `<p class="modal-text cap">${this.address}, ${this.city}, ${this.abbreviateState()}, ${this.zip}</p>`;
    modalDetail += `<p class="modal-text">Birthday: ${this.convertBirthday()} </p>`;
    return modalDetail;
  }

  abbreviateState() {
   let states = [
       ['Alabama', 'AL'],
       ['Alaska', 'AK'],
       ['American Samoa', 'AS'],
       ['Arizona', 'AZ'],
       ['Arkansas', 'AR'],
       ['Armed Forces Americas', 'AA'],
       ['Armed Forces Europe', 'AE'],
       ['Armed Forces Pacific', 'AP'],
       ['California', 'CA'],
       ['Colorado', 'CO'],
       ['Connecticut', 'CT'],
       ['Delaware', 'DE'],
       ['District Of Columbia', 'DC'],
       ['Florida', 'FL'],
       ['Georgia', 'GA'],
       ['Guam', 'GU'],
       ['Hawaii', 'HI'],
       ['Idaho', 'ID'],
       ['Illinois', 'IL'],
       ['Indiana', 'IN'],
       ['Iowa', 'IA'],
       ['Kansas', 'KS'],
       ['Kentucky', 'KY'],
       ['Louisiana', 'LA'],
       ['Maine', 'ME'],
       ['Marshall Islands', 'MH'],
       ['Maryland', 'MD'],
       ['Massachusetts', 'MA'],
       ['Michigan', 'MI'],
       ['Minnesota', 'MN'],
       ['Mississippi', 'MS'],
       ['Missouri', 'MO'],
       ['Montana', 'MT'],
       ['Nebraska', 'NE'],
       ['Nevada', 'NV'],
       ['New Hampshire', 'NH'],
       ['New Jersey', 'NJ'],
       ['New Mexico', 'NM'],
       ['New York', 'NY'],
       ['North Carolina', 'NC'],
       ['North Dakota', 'ND'],
       ['Northern Mariana Islands', 'NP'],
       ['Ohio', 'OH'],
       ['Oklahoma', 'OK'],
       ['Oregon', 'OR'],
       ['Pennsylvania', 'PA'],
       ['Puerto Rico', 'PR'],
       ['Rhode Island', 'RI'],
       ['South Carolina', 'SC'],
       ['South Dakota', 'SD'],
       ['Tennessee', 'TN'],
       ['Texas', 'TX'],
       ['US Virgin Islands', 'VI'],
       ['Utah', 'UT'],
       ['Vermont', 'VT'],
       ['Virginia', 'VA'],
       ['Washington', 'WA'],
       ['West Virginia', 'WV'],
       ['Wisconsin', 'WI'],
       ['Wyoming', 'WY'],
     ];

     let input = this.state.replace(/\w\S*/g, (txt)=> {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
     });
     for (let i = 0; i < states.length; i++) {
      if (states[i][0] == input) {
          return (states[i][1]);
      }
     }
   }

}
