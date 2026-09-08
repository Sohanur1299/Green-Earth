



async function auto_category_fetch() {
    try {
        const url = "https://openapi.programming-hero.com/api/categories";
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.categories);
        display_categories(data.categories); // sending data to display categories

    } catch (error) {
        console.log(`from async func${error}`);
    }
}
function display_categories(data) {
    // get the category parent
    const cat_parent = document.getElementById("category-parent");
    for (const each of data) {
        const new_elem = document.createElement("button");
        new_elem.classList.add("block", "hover:text-success", "font-medium");
        new_elem.innerText = each.category_name;
        cat_parent.appendChild(new_elem); // added into the category parent section
    }

}


// async always promise return kore

auto_category_fetch()
    .then((value) => {
        console.log(`from outside value ${value}`);
    })
    .catch((err) => {
        console.log(`from outside error ${err}`);

    })