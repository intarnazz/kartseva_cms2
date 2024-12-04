const addProduct = (obj, id, per) => {
  obj.forEach((el) => {
    const tr = document.createElement("tr");
    tr.classList.add("cms-main__container__table-form__table__row");
    if (!id.includes(el.id)) {
      tr.insertAdjacentHTML(
        "beforeend",
        `<td class="cms-main__container__table-form__table__row__col-id">
                ${el.id}</td>
        <td class="cms-main__container__table-form__table__row__col-name">
                ${el.denomination}
        </td>
        <td class="cms-main__container__table-form__table__row__col-category">
        ${el.category}</td>
        <td class="cms-main__container__table-form__table__row__col-unit">${el.points}
        </td>
        <td class="cms-main__container__table-form__table__row__col-amount">${el.count}
        </td>
        <td class="cms-main__container__table-form__table__row__col-price">$${el.price}
        </td>
        <td class="cms-main__container__table-form__table__row__col-sum">$${el.value}
        </td>
<td class="cms-main__container__table-form__table__row__col-img">
    <img
        src="icons/img.svg"
        alt="изображение"
        class="cms-main__container__table-form__table__row__col-img__icon"
        data-image="${el.image}"
        style="cursor: pointer;"
    >
</td>
        <td class="cms-main__container__table-form__table__row__col-edit">
            <img
                src="icons/edit.svg" alt="изменение"
                class="cms-main__container__table-form__table__row__col-edit__icon">
        </td>
        <td class="cms-main__container__table-form__table__row__col-delete">
            <img
                src="icons/delete.svg" alt="удаление"
                class="cms-main__container__table-form__table__row__col-delete__icon">
        </td>`
      );
      per.table.append(tr);
      id.push(el.id);
    }
  });

  const imgIcons = document.querySelectorAll(
    ".cms-main__container__table-form__table__row__col-img img"
  );
  imgIcons.forEach((img) => {
    img.onclick = function () {
      const imageUrl = this.getAttribute("data-image");

      const popupHtml = ` 
        <div onclick="removeElement(this)" class="popup" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 9999;">
            <img id="popup-image" src="${imageUrl}" style="height: 50%; object-fit: cover; width: auto"/>
        </div>
      `;

      document.body.insertAdjacentHTML("beforeend", popupHtml);

      document.addEventListener("click", function(event) {
        if (event.target && event.target.id === "popup-close") {
          const popup = document.querySelector(".popup");
          popup.remove(); 
        }
      });
    };
  });

  localStorage.setItem("obj", JSON.stringify(obj));
  document.getElementById("allPrice").textContent = per.sumAllProduct;
  return obj;
};

export default addProduct;
