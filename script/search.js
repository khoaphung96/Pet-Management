"use strict";
// Lay cac Dom Element can su dung
const sidebarBtn = document.querySelector("#sidebar");
const typeInput = document.querySelector("#input-type");
const breedInput = document.querySelector("#input-breed");
const findBtn = document.querySelector("#find-btn");
const idInput = document.querySelector("#input-id");
const nameInput = document.querySelector("#input-name");
const vaccinatedInput = document.querySelector("#input-vaccinated");
const dewormedInput = document.querySelector("#input-dewormed");
const sterilizedInput = document.querySelector("#input-sterilized");
const tableBodyEl = document.querySelector("#tbody");

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
 `;
    tableBodyEl.appendChild(row);
  }
}

// Hàm hiển thị danh sách giống thú cưng
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  breedArr1.forEach(function (item) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${item.name}</option>
        `;
    breedInput.appendChild(option);
  });
}

// Gọi hàm
renderBreed();

// Bắt sự kiện khi nhấn vào nút find
findBtn.addEventListener("click", function () {
  let searchPetArr = petArr;

  // Phần này em viết nhằm mục đích lọc: Nếu giá trị nào được nhập hoặc check thì sẽ là 1, còn nếu giá trị nào không được nhập hoặc check thì sẽ là 0. Sau đó đưa về 1 arr để phục vụ việc so sánh bên dưới. Vì các giá trị của dữ liệu thú cưng là các loại khác nhau nên em sẽ chia ra làm 3 arr vầ sau đó gộp về 1 arr
  const data1 = [idInput.value, nameInput.value];
  const data2 = [typeInput.value, breedInput.value];
  const data3 = [
    vaccinatedInput.checked,
    dewormedInput.checked,
    sterilizedInput.checked,
  ];
  // Phần này là kiểm tra xem liệu dữ liệu đã có được nhập chưa
  data1.forEach(function (a, i) {
    if (a.trim() === "") {
      data1[i] = 0;
    } else {
      data1[i] = 1;
    }
  });
  // Phần này kiểm tra xem liệu dữ liệu đã có được chọn chưa
  data2.forEach(function (a, i) {
    if (a.trim() === "Select Type" || a.trim() === "Select Breed") {
      data2[i] = 0;
    } else {
      data2[i] = 1;
    }
  });
  // Phần này kiểm tra xem dữ liệu đã có được check chưa
  data3.forEach(function (a, i) {
    if (a === false) {
      data3[i] = 0;
    } else {
      data3[i] = 1;
    }
  });
  // Gộp 3 arr ở trên thành 1 arr
  const data = data1.concat(data2).concat(data3);
  // Đây là phần quan trọng nhất để kiểm tra xem dữ liệu có thỏa mãn tất cả các điều kiện hay không
  searchPetArr = petArr.filter(function (item) {
    return (
      (data[0] === 1
        ? item.id.includes(idInput.value)
        : (searchPetArr = petArr)) &&
      (data[1] === 1
        ? item.petName.includes(nameInput.value)
        : (searchPetArr = petArr)) &&
      (data[2] === 1
        ? item.type.includes(typeInput.value)
        : (searchPetArr = petArr)) &&
      (data[3] === 1
        ? item.breed.includes(breedInput.value)
        : (searchPetArr = petArr)) &&
      (data[4] === 1 ? item.vaccinated === true : (searchPetArr = petArr)) &&
      (data[5] === 1 ? item.dewormed === true : (searchPetArr = petArr)) &&
      (data[6] === 1 ? item.sterilized === true : (searchPetArr = petArr))
    );
  });

  // Gọi lại hàm
  renderTableData(searchPetArr);
});
