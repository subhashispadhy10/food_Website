const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const cart_icon = document.querySelectorAll(".show_cart");
const cart_Tab = document.querySelector(".cart_table_container");
const close_btn = document.querySelector(".close_btn");
const menu_container = document.querySelector(".menu_container")
let product = [];
let cart_pro = [];

const price_total=document.querySelector(".price_total");
const icon_quantity=document.querySelector(".cart_value");
const update_totals=()=>{
     let total_cost=0;
     let total_quantity=0;
     document.querySelectorAll(".cart_update").forEach(item=>{
      const tq=parseInt(item.querySelector(".num_quantity").innerText);
       const price=parseFloat(item.querySelector('.cart_price').textContent.replace('$',''));
       total_cost+=price
       total_quantity+=tq;
     })
     price_total.textContent=`$${total_cost.toFixed(2)}`;
     icon_quantity.innerText=total_quantity;
}

cart_icon.forEach(cart => {
  cart.addEventListener("click", () => {
    cart_Tab.classList.add("cart_table_active");
  })
})
close_btn.addEventListener("click", () => {
  cart_Tab.classList.remove("cart_table_active");
})

const show_card = () => {
  product.forEach(p => {


    card_box = document.createElement("div");
    card_box.classList.add("card_box");
    card_box.innerHTML = `
           <div class="card_image">
            <img src="${p.image}" alt="">
           </div>
           <h3>${p.name}</h3>
           <p class="price">${p.price}</p>
           <button class="menu_btn">Add to Cart</button>
         `;
    menu_container.appendChild(card_box);

    const add_btn = card_box.querySelector(".menu_btn");
    add_btn.addEventListener("click", () => {
      cart_add(p);
    })
  })

}
const cart_list = document.querySelector(".cart_list");
const cart_add = (p) => {
  let existing_product = cart_pro.find(item => item.id === p.id);
  if (existing_product) {
    alert("items is already exist");
    return
  }
  cart_pro.push({ ...p });
  let quantity = 1;
  let cart_total = parseFloat(p.price.replace('$', ''));

  let cart_update = document.createElement("div");
  cart_update.classList.add("cart_update");
  cart_update.innerHTML = `
    <div class="cart_image">
                      <img src="${p.image}" alt="">
                     </div>
                     <div class="cart_name">
                       <h3>${p.name}</h3>
                       <p class="cart_price">${p.price}</p>
                     </div>
                     <div class="cart_quantity">
                         <div class="cart_minus"><i class="fa-solid fa-minus"></i></div>
                         <div class="num_quantity">1</div>
                         <div class="cart_plus"><a href="#"><i class="fa-solid fa-plus"></i></a></div>
                     </div>
    `;
  cart_list.appendChild(cart_update);
  update_totals();
  let plus_btn = cart_update.querySelector(".cart_plus");
  let cart_quantity = cart_update.querySelector(".num_quantity");
  let item_total = cart_update.querySelector(".cart_price");
  let minus_btn = cart_update.querySelector(".cart_minus");
  plus_btn.addEventListener("click", (e) => {
    e.preventDefault();
    quantity++;
    cart_quantity.innerText = quantity;
    item_total.innerText = `$${(cart_total * quantity).toFixed(2)}`
    update_totals();

  })
  minus_btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (quantity > 1) {
      quantity--;
      cart_quantity.innerText = quantity;
      item_total.innerText = `$${(cart_total * quantity).toFixed(2)}`
      update_totals();
    }
    else{
       cart_update.remove();
       cart_pro=cart_pro.filter(item=>item.id !== p.id)
       update_totals();
    }


  })

};

const init = () => {
  fetch("product.json").then(response => response.json()).then(data => {
    product = data;
    show_card();
  });
};

init();


