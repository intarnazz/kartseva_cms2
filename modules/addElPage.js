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
        <td class="cms-main__container__table-form__table__row__col-unit">${el.points}</td>
        <td class="cms-main__container__table-form__table__row__col-amount">${el.count}</td>
        <td class="cms-main__container__table-form__table__row__col-price">$${
          el.price
        }</td>
        <td class="cms-main__container__table-form__table__row__col-sum">$${
          el.value
        }</td>
        <td class="cms-main__container__table-form__table__row__col-img">
            <img
                src="${el.image || 'icons/img.svg'}" alt="изображение"
                class="cms-main__container__table-form__table__row__col-img__icon">
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
  localStorage.setItem("obj", JSON.stringify(obj));
  document.getElementById("allPrice").textContent = per.sumAllProduct;
  return obj;
};


export default addProduct;
