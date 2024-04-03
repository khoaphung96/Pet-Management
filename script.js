"use strict";
// Lay cac Dom Element can su dung
const submitBtn = document.querySelector("#submit-btn");
const idInput = document.querySelector("#input-id");
const nameInput = document.querySelector("#input-name");
const ageInput = document.querySelector("#input-age");
const typeInput = document.querySelector("#input-type");
const weightInput = document.querySelector("#input-weight");
const lengthInput = document.querySelector("#input-length");
const colorInput = document.querySelector("#input-color-1");
const breedInput = document.querySelector("#input-breed");
const vaccinatedInput = document.querySelector("#input-vaccinated");
const dewormedInput = document.querySelector("#input-dewormed");
const sterilizedInput = document.querySelector("#input-sterilized");
const tableBodyEl = document.querySelector("#tbody");
const healthyBtn = document.querySelector("#healthy-btn");
const calcBmiBtn = document.querySelector("#calc-bmi-btn");
const sidebarBtn = document.querySelector("#sidebar");

// const data1 = {
//   id: "P001",
//   petName: "Tom",
//   age: 3,
//   type: "cat",
//   weight: "5 kg",
//   length: "50 cm",
//   color: "black",
//   breed: "Tabby",
//   vaccinated: true,
//   dewormed: true,
//   sterilized: true,
//   data: new Date(),
// };

// const data2 = {
//   id: "P002",
//   petName: "Tyke",
//   age: 5,
//   type: "dog",
//   weight: "3 kg",
//   length: "40 cm",
//   color: "black",
//   breed: "Mixed Breed",
//   vaccinated: false,
//   dewormed: true,
//   sterilized: true,
//   data: new Date(),
// };

// Gọi hàm
renderTableData(petArr);

// 1. Bat su kien Click vao nut Submit
submitBtn.addEventListener("click", function () {
  // 2. Lay du lieu tu cac ham input
  const data = {
    id: idInput.value,
    petName: nameInput.value,
    age: ageInput.value,
    type: typeInput.value,
    weight: weightInput.value,
    petLength: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    day: new Date(),
  };
  // 3. Validate du lieu hop le
  function validateData(data) {
    let isValidate = true;
    if (data.id.trim() === "") {
      alert("Please input ID!");
      isValidate = false;
    }
    if (data.petName.trim() === "") {
      alert("Please input Pet's Name!");
      isValidate = false;
    }
    if (data.age === "") {
      alert("Please input Pet's Age!");
      isValidate = false;
    }
    if (data.weight === "") {
      alert("Please input Pet's Weight!");
      isValidate = false;
    }
    if (data.petLength === "") {
      alert("Please input Pet's Length!");
      isValidate = false;
    }
    if (data.type === "Select Type") {
      alert("Please select Type!");
      isValidate = false;
    }
    if (data.breed === "Select Breed") {
      alert("Please select Breed!");
      isValidate = false;
    }
    if (Number(data.age) < 1 || Number(data.age) > 15) {
      alert("Age must be between 1 and 15!");
      isValidate = false;
    }
    if (Number(data.weight) < 1 || Number(data.weight) > 15) {
      alert("Weight must be between 1 and 15!");
      isValidate = false;
    }
    if (Number(data.petLength) < 1 || Number(data.petLength) > 100) {
      alert("Length must be between 1 and 100!");
      isValidate = false;
    }
    for (let i = 0; i < petArr.length; i++) {
      if (data.id === petArr[i].id) {
        alert("ID must unique!");
        isValidate = false;
        break;
      }
    }
    return isValidate;
  }

  // 6. Xoa cac du lieu vua nhap tren form
  const clearInput = function () {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select Type";
    weightInput.value = "";
    lengthInput.value = "";
    colorInput.value = "#000000";
    breedInput.value = "Select Breed";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
  };

  // 4. Them thu cung vao danh sach
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
    saveToStorage("petArr", petArr);
  }
});

// 5. Hien thi danh sach thu cung
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = ` 
<th scope="row">${petArr[i].id}</th>
<td>${petArr[i].petName}</td>
<td>${petArr[i].age}</td>
<td>${petArr[i].type}</td>
<td>${petArr[i].weight} kg</td>
<td>${petArr[i].petLength} cm</td>
<td>${petArr[i].breed}</td>
<td>
<i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
</td>
<td><i class=${
      petArr[i].vaccinated === true
        ? "bi-check-circle-fill"
        : "bi-x-circle-fill"
    }></i></td>
<td><i class=${
      petArr[i].dewormed === true ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }></i></td>
<td><i class=${
      petArr[i].sterilized === true
        ? "bi-check-circle-fill"
        : "bi-x-circle-fill"
    }></i></td>
    <td>${
      isNaN(petArr[i].day)
        ? petArr[i].day.slice(0, 10)
        : String(petArr[i].day.getFullYear()) +
          "-" +
          String(petArr[i].day.getMonth() + 1) +
          "-" +
          +String(petArr[i].day.getDate())
    }</td>
<td>
<button type="button" class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button>
</td> `;
    tableBodyEl.appendChild(row);
  }
}
/* <td>${petArr[i].day.slice(0, 10)}</td> */
/* <td>${petArr[i].day.getDate()}/${petArr[i].day.getMonth() + 1}/${petArr[
      i
    ].day.getFullYear()}</td> */

// 7. Xoa mot thu cung
const deletePet = function (petId) {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === petId) {
        petArr.splice(i, 1);
        renderTableData(petArr);
        saveToStorage("petArr", petArr);
      }
    }
  }
};

// const deletePet = function (petId) {
//   if (confirm("Are you sure?")) {
//     for (let i = 0; i < petArr1.length; i++) {
//       if (petArr1[i].id === petId) {
//         petArr1.splice(i, 1);
//         console.log(petArr1);
//       }
//     }
//   }
// };
// 8. Hien thi cac thu cung khoe manh
let healthyCheck = false;
healthyBtn.addEventListener("click", function () {
  const healthyPetArr = [];
  if (healthyCheck === false) {
    for (let i = 0; i < petArr.length; i++) {
      if (
        petArr[i].vaccinated === true &&
        petArr[i].dewormed === true &&
        petArr[i].sterilized === true
      ) {
        healthyPetArr.push(petArr[i]);
      }
    }
    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = true;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = false;
  }
});

// 9. Tinh toan BMI
// calcBmiBtn.addEventListener("click", function () {
//   for (let i = 0; i < petArr.length; i++) {
//     const calcBmi = function () {
//       petArr[i].bmi =
//         petArr[i].type === "Dog"
//           ? (petArr[i].weight * 703) / petArr[i].petLength ** 2
//           : (petArr[i].weight * 886) / petArr[i].petLength ** 2;
//       petArr[i].bmi = petArr[i].bmi.toFixed(2);
//     };
//     calcBmi();
//     renderTableData(petArr);
//   }
// });

// Bo sung Animation cho Sidebar
sidebarBtn.addEventListener("click", function () {
  sidebarBtn.classList.toggle("active");
});

// Bắt sự kiện khi nhấn vào nút Type
typeInput.addEventListener("click", renderBreed);
// Hàm hiển thị giống thú cưng theo Type
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  const breedDogs = breedArr1.filter((item) => item.type === "Dog");
  const breedCats = breedArr1.filter((item) => item.type === "Cat");
  if (typeInput.value === "Dog") {
    breedDogs.forEach(function (item) {
      const option = document.createElement("option");
      option.innerHTML = `<option>${item.name}</option>
          `;
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    breedCats.forEach(function (item) {
      const option = document.createElement("option");
      option.innerHTML = `<option>${item.name}</option>
          `;
      breedInput.appendChild(option);
    });
  }
}
