"use strict";
const jsonURL = "https://petlatkea.dk/2021/hogwarts/students.json";
window.addEventListener("DOMContentLoaded", loadJSON);

//create object protoype
const StudentList = {
  firstName: "",
  lastName: "",
  middleName: "",
  nickName: "",
  house: "",
};

//create global array
let studentListArr = [];

//fetch data
function loadJSON() {
  fetch(jsonURL)
    .then((response) => response.json())
    .then((jsonData) => {
      getList(jsonData);
    });
}

//get list items
function getList(jsonData) {
  jsonData.forEach((listedStudent) => {
    //CLEAN LIST
    //trim extra space at beginning and an end in fullname
    let newList = listedStudent.fullname.trim();

    //find first and last space
    const firstSpace = newList.indexOf(" ");
    const lastSpace = newList.lastIndexOf(" ");

    //name first letter capital, rest lowercase
    let name = newList.substring(firstSpace, 0);
    let firstName =
      name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    if (firstName == "") {
      firstName = newList.substring(lastSpace + 1);
    }

    //find middle name using space&make capitals where needed
    const middle = newList.substring(firstSpace + 1, lastSpace);
    let middleName =
      middle.charAt(0).toUpperCase() + middle.substring(1).toLowerCase();
    if (middleName.includes(" ") || middleName.includes("")) {
      middleName = undefined;
    }

    //find nickname and remove ""
    let nickname = newList.substring(firstSpace + 1, lastSpace);
    let nickName;
    if (nickname.includes('"')) {
      nickName = nickname.substring(1, nickname.length - 1);
      console.log(nickName);
    }

    //find lastname using spaces&capitalize where needed
    const last = newList.substring(lastSpace + 1);
    let lastName =
      last.charAt(0).toUpperCase() + last.substring(1).toLowerCase();
    if (lastName.includes("-")) {
      lastName = lastName.split("-");
      lastName[1] =
        lastName[1].charAt(0).toUpperCase() +
        lastName[1].substring(1).toLowerCase();
      lastName = lastName.join("-");
    }

    //trim space in front of string&capitalize
    let trimStartHouse = listedStudent.house.trimStart();
    let house =
      trimStartHouse.charAt(0).toUpperCase() +
      trimStartHouse.substring(1).toLowerCase();

    //create object from protoype
    let newStudentList = Object.create(StudentList);

    newStudentList.firstName = firstName;
    newStudentList.middleName = middleName;
    newStudentList.nickName = nickName;
    newStudentList.lastName = lastName;
    newStudentList.house = house;

    //push in Arr
    studentListArr.push(newStudentList);
    console.table(newStudentList);
  });
}
