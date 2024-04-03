"use strict";
// Lay cac Dom Element can su dung
const sidebarBtn = document.querySelector("#sidebar");
const exportBtn = document.querySelector("#export-btn");
const importBtn = document.querySelector("#import-btn");
const inputFileEl = document.querySelector("#input-file");

// Bo sung Animation cho Sidebar
sidebarBtn.addEventListener("click", function () {
  sidebarBtn.classList.toggle("active");
});

// Bắt sự kiện khi nhấn vào nút Export
exportBtn.addEventListener("click", function () {
  const isExport = confirm("Are you sure to export?");
  if (isExport) {
    saveDataToFile();
  }
});

// Hàm lưu dữ liệu ra bên ngoài file json
function saveDataToFile() {
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });

  saveAs(blob, "petArr.json");
}

// Bắt sự kiện khi nhấn vào nút Import
importBtn.addEventListener("click", function () {
  if (!inputFileEl.value) {
    alert("Please choose file to import!");
  } else {
    const isImport = confirm("Are you sure to import?");
    if (isImport) {
      const file = inputFileEl.files[0];
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          saveToStorage("petArr", JSON.parse(reader.result));
          alert("Successful import!");
        },
        false
      );

      if (file) {
        reader.readAsText(file);
      }
      inputFileEl.value = "";
    }
  }
});
