let dataCenter = [];
const cartHolder = {}; // remaining
let carSum = 0;


// 3
async function all_trees_fetch() {
    try {
        const url = "https://openapi.programming-hero.com/api/plants";
        const res = await fetch(url);
        const data = await res.json();
        dataCenter = data.plants; // saving it here
        display_cards(data.plants); // sending data to display categories
        // call 4
    } catch (error) {
        console.log(`all_trees_fetch - from async func${error}`);
    }
}

// 4
function display_cards(data) {
    // console.log(data.length);

    const card_parent = document.getElementById("card-parent");
    card_parent.innerHTML = ""; // clean the card-parent-display
    for (const card of data) {
        // dataCenter.push(card);
        const new_card = document.createElement("article");
        new_card.classList.add("card", "bg-white", "border", "border-[#e1eee5]", "shadow-sm", "hover:shadow-md", "transition");
        new_card.innerHTML = `
        <figure class="h-28 sm:h-36 bg-[#f4f7f4]">
                            <img src="${card.image}" alt="Green plant" class="h-full w-full  p-3" />
                        </figure>
                        <div class="card-body p-3 sm:p-4 gap-1">
                            <h3 class="font-bold text-sm sm:text-base">${card.name}</h3>
                            <p class="text-xs text-gray-500">${card.description}}</p>
                            <div class="flex items-center justify-between mt-2">
                                <span class="font-bold text-[#087b3d]">${card.category}</span>
                                <span class="text-xs">$${card.price}</span>
                            </div>
                            <button onclick="set_cart('${card.name}', ${card.price}, '${card.category}')"
                                class="btn btn-sm min-h-8 h-8 mt-2 rounded-full bg-[#087b3d] hover:bg-[#066a34] border-none text-white">
                                Add to cart
                            </button>
                        </div>
        `
        card_parent.appendChild(new_card);
    }
}

// set 1
const set_cart = ((name, price, category) => {
    console.log('add pressed', name, price, category);
    if (!cartHolder[name]) {
        cartHolder[name] = [price, 1]; // Create this Object
        // carSum += (cartHolder[name][0] * cartHolder[name][1]) // sum done
    } else {
        cartHolder[name][1] += 1; // Update the Object Count
    }
    carSum += (cartHolder[name][0]) // sum done
    // console.log(cartHolder, carSum);
    displayCart();
})

// set 2
function displayCart() {
    const cartParent = document.getElementById("cart-parent");
    cartParent.innerHTML = "";

    const childOne = document.createElement("div");
    for (const eachProd in cartHolder) {
        const newProd = document.createElement("div");
        newProd.classList.add("gap-3",
            "p-3",
            "bg-neutral-100",
            "rounded-xl");
        newProd.innerHTML = `<p>${eachProd}</p>
                            <span><b>৳${cartHolder[eachProd][0]} × ${cartHolder[eachProd][1]}</b></span>`
        childOne.appendChild(newProd);
    }
    cartParent.appendChild(childOne);

    const childTwo = document.createElement("div");
    childTwo.innerHTML = `<span>Total</span><span class="text-[#087b3d]">৳${carSum}</span>`;

    cartParent.appendChild(childTwo);

}

// 1
async function auto_category_fetch() {
    try {
        const url = "https://openapi.programming-hero.com/api/categories";
        const res = await fetch(url);
        const data = await res.json();
        display_categories(data.categories); // sending data to display categories

    } catch (error) {
        console.log(`auto_category_fetch - from async func${error}`);
    }
}
// 2
function display_categories(data) {
    // get the category parent
    const cat_parent = document.getElementById("category-parent");
    const cat_select_parent = document.getElementById("category-select-parent");

    // large screen
    if (cat_parent) {
        for (const each of data) {
            const new_elem = document.createElement("button");
            new_elem.classList.add("block", "hover:text-success", "font-medium");
            new_elem.innerText = each.category_name;
            cat_parent.appendChild(new_elem); // added into the category parent section
        }

        // set "All Trees" Active and fetch for all
        const all_tree_btn = cat_parent.children[0]; // first children 
        // console.log(all_tree_btn); // call 3
        all_trees_fetch();
        all_tree_btn.classList.add("active");
    }

    // mobile
    if (cat_select_parent) {
        // do that
        for (const each of data) {
            const new_elem = document.createElement("option");
            new_elem.innerText = each.category_name;
            cat_select_parent.appendChild(new_elem); // added into the category parent section
            all_trees_fetch();
        }

    }

}


const update_active = ((btn) => {
    const get_all_active = document.getElementsByClassName("active");
    for (const each_active of get_all_active) {
        each_active.classList.remove("active");
    }

    btn.classList.add("active");
})




// async always promise return kore
auto_category_fetch()
    .then((value) => {
        // console.log(`from outside value ${value}`);
    })
    .catch((err) => {
        console.log(`from outside error ${err}`);
    })



// add Event Listener to Desktop Version
document.getElementById("category-parent").addEventListener("click", ((event) => {
    if (event.target.id !== "category-parent") {
        // console.log(event.target);
        const target_category = event.target.innerText;

        if (target_category === "All Trees") {
            display_cards(dataCenter);
            update_active(event.target);
            return;
        }

        const filterd_arr = dataCenter.filter((plant) => {
            if (plant.category === target_category) {
                return plant;
            }
        })

        display_cards(filterd_arr);
        update_active(event.target);


    }

}))


// add Event Listener to  Mobile Version
document.getElementById("category-select-parent").addEventListener("click", ((event) => {
    if (event.target.id !== "category-select-parent") {
        // console.log(event.target);
        const target_category = event.target.innerText;

        if (target_category === "All Plants") {
            display_cards(dataCenter);
            update_active(event.target);
            return;
        }

        const filterd_arr = dataCenter.filter((plant) => {
            if (plant.category === target_category) {
                return plant;
            }
        })

        display_cards(filterd_arr);
        update_active(event.target);


    }

}))


