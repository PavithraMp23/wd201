let checkingAge = (event) => {
    let dobIn= document.getElementById('dob');
    const today = new Date();
     //maximum date
    let max=new Date(
        today.getFullYear()-18,
        today.getMonth(),
        today.getDate()
    );
    //minimum date
    let min =new Date(
        today.getFullYear()-55,
        today.getMonth(),
        today.getDate()
    );
    const formatDate = (date) => {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

    //to change attribute of the element 
    dobIn.setAttribute('max', formatDate(max));
    dobIn.setAttribute('min', formatDate(min));
}

window.addEventListener('DOMContentLoaded',()=> {
    checkingAge();
    tableEntry();
});



let userForm = document.getElementById("user-form");
//for multiple submits
let getUserEntries = () =>{
    let entries=localStorage.getItem("userEntries");//keys should be same for get and set
    if(entries===null){
        return [];
    }
    else{
        return JSON.parse(entries);
    }
}

let saveUserFrom = (event ) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;
    const entry= {
        name:name,
        email:email,
        password:password,
        dob:dob,
        acceptTerms:acceptTerms 
    };
    let userEntries=getUserEntries();
    userEntries.push(entry);
    localStorage.setItem("userEntries",JSON.stringify(userEntries));
    userForm.reset();
    tableEntry();

}
//table entries
let tableEntry = () =>{
    let entries=getUserEntries();
    let tableBody = document.getElementById("user-entries");

    tableBody.innerHTML = "";

    tableBody.innerHTML = entries.map(item => `<tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.password}</td>
            <td>${item.dob}</td>
            <td>${item.acceptTerms}</td>
            </tr>`).join('');
};
userForm.addEventListener("submit", saveUserFrom);