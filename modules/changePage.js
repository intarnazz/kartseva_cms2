export const changeValueEl = (obj) => {
    const numAll = document.querySelector('.cms-main__table-foot__page-numbers__all')
    const numOnPage = document.querySelector('.cms-main__table-foot__page-numbers__end')
    const zeroOnPage = document.querySelector('.cms-main__table-foot__page-numbers__start')
    numAll.textContent = obj.length
    let optValue = document.getElementById("row-amount").value;
    if (obj.length < optValue) {
        numOnPage.textContent = obj.length
    } else {
        numOnPage.textContent = optValue
    }
    if (obj.length < 1) {
        zeroOnPage.textContent = 0
    } else {
        zeroOnPage.textContent = 1
    }
}

export const calculateSum = (quantity, price, discount) => {
    if ((0 < discount <= 100) && (discount !== '')) {
        return (quantity * price) - ((quantity * price) * (discount / 100));
    } else {
        return quantity * price;
    }
}

// Изменение Ид
export const changeId = (allConst, obj, id) => {
    allConst.tableId.forEach((el) => {
        console.log(allConst.tableId)
        el.addEventListener("click", (e) => {
            let o = 0;
            let p = prompt("Введите новый ID: ");
            allConst.tableId.forEach((elem) => {
                if (elem.textContent === p || p.trim() === "") {
                    o += 1;
                }
            });
            if (o === 0) {
                obj.forEach((elem) => {
                    if (elem.id == e.target.textContent.trim()) {
                        if (!(id.includes(p))) {
                            elem.id = p;
                            e.target.textContent = p;
                            localStorage.setItem("obj", JSON.stringify(obj));
                        } else {
                            alert('Тако id уж ест!!!')

                        }
                    }
                });


            }
        });
    });
}

export const changeItog = (rar) => {
    let sum = 0;
    rar.forEach(el => {
        sum += Number(el.textContent.slice(1))
    })
    console.log(sum)
    document.getElementById('allPrice').textContent = sum;
    return sum
}
