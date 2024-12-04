let obj = [];

if (localStorage.getItem("obj") !== null) {
  obj = JSON.parse(localStorage.getItem("obj"));
  console.log(obj);
}

import delRow from "../modules/delPage.js";
import addProduct from "../modules/addElPage.js";
import * as change from "../modules/changePage.js";
{
  const getFromPage = () => {
    return {
      table: document.querySelector(".cms-main__container__table-form__table"),
      sumValue: document.querySelector(".cms-main__head__sum__value-price"),
      addBtnMain: document.querySelector(
        ".cms-main__container__form__add-button"
      ),
      formAddItem: document.querySelector(".add-item"),
      formClose: document.querySelector(".cancel"),
      inputForm: document.querySelectorAll(".add-item__main-section__form"),
      addProductBtn: document.querySelector(".add-product"),
      allForm: document.querySelector(".add-item__main-section"),
      checkbox: document.querySelector(".add-item__main-section__checkbox"),
      input: document.querySelector(".add-item__main-section__form.litle"),
      checkmark: document.querySelector(".checkmark"),
      inputs: document.querySelectorAll(".add-item__main-section__form"),
      tableId: document.querySelectorAll(
        ".cms-main__container__table-form__table__row__col-id"
      ),
      sum: document.querySelectorAll(
        ".cms-main__container__table-form__table__row__col-sum"
      ),
      addBtnMod: document.querySelector(".add-product"),
    };
  };

  const init = () => {
    let id = [];
    let allConst = getFromPage();
    addProduct(obj, id, allConst);
    allConst = getFromPage();
    change.changeValueEl(obj);
    allConst.sumAllProduct = change.changeItog(allConst.sum);
    change.changeId(allConst, obj, id);

    allConst.allForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(allConst.allForm);
      const namee = formData.get("name");
      const category = formData.get("category");
      const description = formData.get("description");
      const units = formData.get("units");
      const discount = formData.get("discountt");
      const count = formData.get("count");
      const price = formData.get("price");
      const imageFile = formData.get("image"); // Убедитесь, что здесь правильное имя

      if (imageFile && imageFile.size > 0) {
        if (imageFile.size > 1048576) {
          // Проверка на размер файла > 1 МБ
          alert("Изображение не должно превышать размер 1 Мб");
          return;
        }

        const reader = new FileReader();
        reader.onload = function () {
          const imageBase64 = reader.result; // Строка Base64
          obj.push({
            id: Math.floor(Math.random() * 100000),
            denomination: namee,
            category: category,
            points: units,
            count: count,
            price: price,
            image: imageBase64,  // Сохраняем изображение как Base64
            get value() {
              if (discount) {
                return (
                  this.count * this.price - this.count * this.price * (discount / 100)
                );
              } else {
                return this.count * this.price;
              }
            },
            discount: discount,
          });
          

          // Обновляем таблицу и интерфейс
          allConst.formAddItem.style.display = "none";
          document.getElementById("modalSum").textContent = "$";
          allConst.allForm.reset();
          addProduct(obj, id, allConst);
          change.changeValueEl(obj);
          allConst = getFromPage();
          allConst.sumAllProduct = change.changeItog(allConst.sum);
          change.changeId(allConst, obj, id);

          // Сохраняем данные в localStorage
          localStorage.setItem("obj", JSON.stringify(obj));
        };
        reader.readAsDataURL(imageFile); // Преобразуем файл в строку Base64
      } else {
        alert("Выберите изображение!");
      }
    });

    // Модальные окна
    allConst.addBtnMain.addEventListener("click", () => {
      allConst.formAddItem.style.display = "flex";
    });
    allConst.formClose.addEventListener("click", () => {
      allConst.formAddItem.style.display = "none";
    });

    // Дисконт
    allConst.checkbox.addEventListener("change", () => {
      if (allConst.checkbox.checked) {
        allConst.input.removeAttribute("disabled");
      } else {
        allConst.input.setAttribute("disabled", "");
        allConst.input.value = "";
      }
    });

    // Рассчёт в форме
    allConst.inputs.forEach((elem) => {
      elem.addEventListener("change", () => {
        console.log("HAHA");
        const formData = new FormData(allConst.allForm);
        const discount = formData.get("discountt");
        const count = formData.get("count");
        const price = formData.get("price");
        document.getElementById("modalSum").textContent =
          "$ " + change.calculateSum(count, price, discount);
      });
    });
    allConst.checkmark.addEventListener("click", () => {
      console.log("HAHA");
      const formData = new FormData(allConst.allForm);
      const discount = 0;
      const count = formData.get("count");
      const price = formData.get("price");
      document.getElementById("modalSum").textContent =
        "$ " + change.calculateSum(count, price, discount);
    });

    allConst.table.addEventListener("click", (e) => {
      if (
        e.target.classList.contains(
          "cms-main__container__table-form__table__row__col-delete__icon"
        )
      ) {
        delRow(obj, allConst, e);
        change.changeValueEl(obj);
        allConst = getFromPage();
        allConst.sumAllProduct = change.changeItog(allConst.sum);
        change.changeId(allConst, obj, id);
      }
    });
  };

  init();
}
