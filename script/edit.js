"use strict";
// Lay cac Dom Element can su dung
const sidebarBtn = document.querySelector("#sidebar");
const tableBodyEl = document.querySelector("#tbody");
const submitBtn = document.querySelector("#submit-btn");
const containerFormEl = document.querySelector("#container-form");
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

// Bo sung Animation cho Sidebar
sidebarBtn.addEventListener("click", function () {
  sidebarBtn.classList.toggle("active");
});

// Gọi hàm
renderTableData(petArr);

// Hàm hiển thị danh sách thú cưng
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
<td>${petArr[i].day.slice(0, 10)}</td>
<td>
<button type="button" class="btn btn-danger" onclick="startEditPet('${
      petArr[i].id
    }')">Edit</button>
</td> `;
    tableBodyEl.appendChild(row);
  }
}

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
      breedInput.value = petArr.breed;
      const option = document.createElement("option");
      option.innerHTML = `<option>${item.name}</option>
        `;
      breedInput.appendChild(option);
    });
  }
}

// Hàm hiển thị các dữ liệu của thú cưng đã có vào form
function startEditPet(petId) {
  containerFormEl.classList.remove("hide");
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id === petId) {
      idInput.value = petArr[i].id;
      nameInput.value = petArr[i].petName;
      ageInput.value = petArr[i].age;
      typeInput.value = petArr[i].type;
      renderBreed();
      weightInput.value = petArr[i].weight;
      lengthInput.value = petArr[i].petLength;
      colorInput.value = petArr[i].color;
      breedInput.value = petArr[i].breed;
      vaccinatedInput.checked = petArr[i].vaccinated;
      dewormedInput.checked = petArr[i].dewormed;
      sterilizedInput.checked = petArr[i].sterilized;
      typeInput.addEventListener("click", renderBreed);
    }
  }
}

// Bắt sự kiện khi nhấn vào nút Submit
submitBtn.addEventListener("click", function () {
  // Hàm kiểm tra điều kiện
  function validateData() {
    let isValidate = true;
    if (idInput.value.trim() === "") {
      alert("Please input ID!");
      isValidate = false;
    }
    if (nameInput.value.trim() === "") {
      alert("Please input Pet's Name!");
      isValidate = false;
    }
    if (ageInput.value === "") {
      alert("Please input Pet's Age!");
      isValidate = false;
    }
    if (weightInput.value === "") {
      alert("Please input Pet's Weight!");
      isValidate = false;
    }
    if (lengthInput.value === "") {
      alert("Please input Pet's Length!");
      isValidate = false;
    }
    if (typeInput.value === "Select Type") {
      alert("Please select Type!");
      isValidate = false;
    }
    if (breedInput.value === "Select Breed") {
      alert("Please select Breed!");
      isValidate = false;
    }
    if (Number(ageInput.value) < 1 || Number(ageInput.value) > 15) {
      alert("Age must be between 1 and 15!");
      isValidate = false;
    }
    if (Number(weightInput.value) < 1 || Number(weightInput.value) > 15) {
      alert("Weight must be between 1 and 15!");
      isValidate = false;
    }
    if (Number(lengthInput.value) < 1 || Number(lengthInput.value) > 100) {
      alert("Length must be between 1 and 100!");
      isValidate = false;
    }

    return isValidate;
  }

  const validate = validateData();
  // Trường hợp xảy ra khi thỏa mãn điều kiện
  if (validate) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === idInput.value) {
        petArr[i].petName = nameInput.value;
        petArr[i].age = ageInput.value;
        petArr[i].type = typeInput.value;
        petArr[i].weight = weightInput.value;
        petArr[i].petLength = lengthInput.value;
        petArr[i].color = colorInput.value;
        petArr[i].breed = breedInput.value;
        petArr[i].vaccinated = vaccinatedInput.checked;
        petArr[i].dewormed = dewormedInput.checked;
        petArr[i].sterilized = sterilizedInput.checked;
      }
    }
    containerFormEl.classList.add("hide");
    renderTableData(petArr);
    saveToStorage("petArr", petArr);
  }
});
