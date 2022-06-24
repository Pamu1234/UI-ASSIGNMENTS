let hamIcon = document.querySelector(".fa-bars");
let display = document.querySelector("ul");
console.log(display);
hamIcon.addEventListener('click', () => {
  hamIcon.classList.toggle("fa-times")
  display.classList.toggle("visible")
})

var form = `<div class="form-1">
  <div class="form-group">
    <label for="name">Firstname</label>
    <input type="text" id="name" placeholder="Enter Your firstname" required autocomplete="off">
    <small class ="error-msg"></small>
  </div>
  <div class="form-group">
  <label for="lname">Lastname</label>
  <input type="text"  id="lname" placeholder="Enter Your lastname" required autocomplete="off">
  <small class ="error-msg"></small>
</div>
  <div class="form-group ">
    <label for="email">Email</label>
    <input type="email"   id="email" placeholder="Enter Your email" required autocomplete="off">
    <small class ="error-msg"></small>
  </div>
  <div class="form-group text-align-c">
  <button id="reset-button" class="btn" onclick ="resetbtn()">Reset</button>
  </div>
  <div class="form-group text-align-c">
  <button type="submit" class="btn btn-primary" onclick="save()">Add friend</button></div>
</div>`;

function table() {
  let table = `<table class="table">
  <thead>
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Email</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>`;
  for (let i = 0; i < details.length; i++) {
    table = table + `<tr>

      <td>${details[i].name}</td>
      <td>${details[i].name2}</td>
      <td>${details[i].email}</td>
      <td><button type="button" class="edit" onclick="edit(${i})"><i class="fa-solid fa-pen-to-square"></i></button></td>
      <td><button type="button" class="delete" onclick="deleteData(${i})"><i class="fa fa-trash"></i></button></td>
    </tr> `;
  };
  table = table + `</tbody>
    </table>`;
  document.getElementById("table").innerHTML = table;
};
document.getElementById("form").innerHTML = form;
details = [];
getData();
table();


function getData() {
  let Data = localStorage.getItem("details");
  if (Data) {
    details = JSON.parse(Data);
  } else {
    setData();
  };
};
function setData() {
  localStorage.setItem("details", JSON.stringify(details));
};

// Save btn
function save() {
  let name = document.getElementById("name");
  let name2 = document.getElementById("lname");
  let email = document.getElementById("email");

  let data = {
    name: name.value,
    name2: name2.value,
    email: email.value.toLowerCase()
  };
  let ar = validater();
  console.log(ar);
  if (ar) {
    details.push(data);
    setData();
    table();
    name.value = "";
    name2.value = "";
    email.value = "";
  }
  else {
    console.log("data not inserted");
  }
};

// Reset-btn
function resetbtn(){
  let btnClear=document.getElementById("reset-button");
  let inputs= document.querySelectorAll('input');

  btnClear.addEventListener('click',()=>{
    inputs.forEach(input => input.value = '');
  })
}

function deleteData(index) {
  details.splice(index, 1);
  setData();
  table();
};

function edit(index) {
  let editForm = `<div class="editform">
  <div class="form-group">
    <label for="name">Update Firstname</label>
    <input type="text" value="${details[index].name}" id="newName"  placeholder="Update Your Firstname">
  </div>
  <div class="form-group">
  <label for="name">Update Lastname</label>
  <input type="text" value="${details[index].name2}" id="newLname"  placeholder="Update Your Latsname">
</div>
  <div class="form-group email">
    <label for="email">Email</label>
    <input type="email" value="${details[index].email}" id="newEmail" placeholder="Update Your email">
  </div>
  <div class="form-group update-btn">
  <button type="submit" class="btn-primary update" onclick="update(${index})">Update</button>
  </div>
</div>`;
  document.getElementById("form").innerHTML = editForm;

};
function update(index) {
  let newName = document.getElementById('newName');
  let newLname = document.getElementById('newLname');
  let newEmail = document.getElementById('newEmail');

  details[index] = {
    name: newName.value,
    name2: newLname.value,
    email: newEmail.value
  };
  setData();
  table();
  document.getElementById("form").innerHTML = form;

}

//validate function
function validater() {

  let name = document.getElementById("name").value;
  let name2 = document.getElementById("lname").value;
  let email = document.getElementById("email").value;
  email = email.toLowerCase();
  let errorMsg = document.querySelectorAll(".error-msg");
  if (name.value == "" && name2.value == "" && email.value == "") {
    alert("*No blank field will be allowed");
    return false;
  }
  if (name == "") {
    errorMsg[0].textContent = "*Firstname can't be empty";
    return false;
  }
  else if (name.length < 3) {
    errorMsg[0].textContent = "Firstname is too short";
    return false;
  }
  else if (name.match(/[0-9]/g)){
    errorMsg[0].textContent = "*Name should not contain number";
    return false;
  }
  else if (name.match(/[ ]/g)){
    errorMsg[0].textContent = "*White spaces are not allowed";
    return false;
  }
  else if (name.match(/[!@#$%^&*]/g)){
    errorMsg[0].textContent = "*Special charcters are not allowed";
    return false;
  }
  else {
    errorMsg[0].textContent = "";
  }

  if (name2 == "") {
    errorMsg[1].textContent = "*Lastname can't be empty";
    return false;
  }
  else if (name2.length < 3) {
    errorMsg[1].textContent = "*Lastname is too short";
    return false;
  }
  else if (name2.match(/[0-9]/g)){
    errorMsg[1].textContent = "*Surname should not contain number";
    return false;
  }
  else if (name2.match(/[ ]/g)){
    errorMsg[1].textContent = "*White spaces are not allowed";
    return false;
  }
  else if (name2.match(/[!@#$%^&*]/g)){
    errorMsg[1].textContent = "*Special charcters are not allowed";
    return false;
  }
  else {
    errorMsg[1].textContent = "";
  }

  

  if (email == "") {
    errorMsg[2].textContent = "*Email can't be empty";
    return false;
  }
  else if (email.length > 30) {
    errorMsg[2].textContent = "*Email is too large";
    return false;
  }
  else if (email.match(/[ ]/g)){
    errorMsg[2].textContent = "*White spaces are not allowed";
    return false;
  }
  else {
    errorMsg[2].textContent = "";
  }
  if (!(email.endsWith("qualminds.com")|| email.endsWith("gmail.com"))){
    errorMsg[2].textContent = "*Email is invalid";
    return false;
  }

  else{
    return true;
  }

}