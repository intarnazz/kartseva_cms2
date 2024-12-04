const delRow = (obj, per, e) => {
    obj.forEach((elem, index) => {
        if (elem.id == e.target.closest("tr").firstChild.textContent.trim()) {
            document.getElementById("allPrice").textContent = per.sumAllProduct;
            obj.splice(index, 1)
        }
    });
    e.target.closest("tr").remove();
    console.log(obj)
    localStorage.setItem("obj", JSON.stringify(obj));
    const local = JSON.stringify(localStorage.getItem("obj"));
    console.log(obj)
    return obj;
}

export default delRow