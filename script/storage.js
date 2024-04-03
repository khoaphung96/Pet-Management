"use strict";
// Hàm lưu trữ dữ liệu xuống Local Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// Hàm lấy dữ liệu từ Local Storage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Tạo data để text
const data1 = {
  id: "P001",
  petName: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  petLength: 50,
  color: "#000000",
  breed: "Mèo Mướp",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  day: new Date(),
};

const data2 = {
  id: "P002",
  petName: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  petLength: 40,
  color: "#234589",
  breed: "Chó Bắc Hà",
  vaccinated: false,
  dewormed: true,
  sterilized: true,
  day: new Date(),
};

// Kiểm tra xem petArr đã có sẵn ở Local Storage chưa
if (!getFromStorage("petArr")) {
  saveToStorage("petArr", [data1, data2]);
}
const petArr = getFromStorage("petArr");

// Tạo các data của breed để text
const breedCat1 = {
  name: "Mèo Mướp",
  type: "Cat",
};
const breedCat2 = {
  name: "Mèo Vàng",
  type: "Cat",
};
const breedCat3 = {
  name: "Mèo Anh Lông Dài",
  type: "Cat",
};
const breedCat4 = {
  name: "Mèo Chân Ngắn",
  type: "Cat",
};

const breedDog1 = {
  name: "Chó Bắc Hà",
  type: "Dog",
};
const breedDog2 = {
  name: "Chó Lài",
  type: "Dog",
};
const breedDog3 = {
  name: "Chó H Mông Cộc Đuôi",
  type: "Dog",
};
const breedDog4 = {
  name: "Chó Phú Quốc",
  type: "Dog",
};

// Kiểm tra xem breedArr đã có sẵn ở Local Storage chưa
if (!getFromStorage("breedArr1")) {
  saveToStorage("breedArr1", [
    breedCat1,
    breedCat2,
    breedCat3,
    breedCat4,
    breedDog1,
    breedDog2,
    breedDog3,
    breedDog4,
  ]);
}
const breedArr1 = getFromStorage("breedArr1");
