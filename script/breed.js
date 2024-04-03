"use strict";
// Lay cac Dom Element can su dung
const sidebarBtn = document.querySelector("#sidebar");
const tableBodyEl = document.querySelector("#tbody");
const submitBtn = document.querySelector("#submit-btn");
const breedInput = document.querySelector("#input-breed");
const typeInput = document.querySelector("#input-type");

// Bo sung Animation cho Sidebar
sidebarBtn.addEventListener("click", function () {
  sidebarBtn.classList.toggle("active");
});

// Gọi hàm
renderTableBreed(breedArr1);

// Hàm hiển thị danh sách giống thú cưng
function renderTableBreed(breedArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < breedArr1.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = ` 
<td>${i + 1}</td>
<td>${breedArr1[i].name}</td>
<td>${breedArr1[i].type}</td>
<td>
<button type="button" class="btn btn-danger" onclick="deleteBreed('${
      breedArr1[i].name
    }')">Delete</button>
</td> `;
    tableBodyEl.appendChild(row);
  }
}

// Bắt sự kiện khi nhấn vào nút submit
submitBtn.addEventListener("click", function () {
  const data = {
    name: breedInput.value,
    type: typeInput.value,
  };

  const clearInput = function () {
    breedInput.value = "";
    typeInput.value = "Select Type";
  };

  // Hàm kiểm tra điều kiện
  function validateData(data) {
    let isValidate = true;
    if (data.name.trim() === "") {
      alert("Please input breed's name!");
      isValidate = false;
    }
    if (data.type === "Select Type") {
      alert("Please select Type!");
      isValidate = false;
    }
    return isValidate;
  }

  const validate = validateData(data);

  // Trường hợp xảy ra khi thỏa mãn điều kiện
  if (validate) {
    breedArr1.push(data);
    clearInput();
    renderTableBreed(breedArr1);
    saveToStorage("breedArr1", breedArr1);
  }
});

// Hàm xóa giống thú cưng khi click vào nút delete
const deleteBreed = function (breedName) {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < breedArr1.length; i++) {
      if (breedArr1[i].name === breedName) {
        breedArr1.splice(i, 1);
        saveToStorage("breedArr1", breedArr1);
        renderTableBreed(breedArr1);
      }
    }
  }
};
