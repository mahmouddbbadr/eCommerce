import {
  createCard,
  getCart,
  updateCartIcon,
  showLoadingScreen,
  showFetchErrorScreen,
  hideLoadingScreen,
  hideFetchErrorScreen,
} from "./global.js";

/////////////////////////////////////////////////
//////// toast //////////////////////////////////
const toastLiveExample = document.getElementById("liveToast");
////////////to top //////////////////////////////
let toTopBtn = document.getElementById("scroll-to-top");
document.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY;
  if (scrollPosition > 100) {
    toTopBtn.style.display = "flex";
  } else {
    toTopBtn.style.display = "none";
  }
});

toTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

let productsBox = document.querySelector(".products");

/////////////////////////////////////////////////

///////start categories ////////////////////////////////
let catsDiv = document.querySelector(".categories-spans");
fetch("https://fakestoreapi.com/products/categories")
  .then((res) => res.json())
  .then((categories) => {
    for (let i = 0; i < categories.length; i++) {
      let span = document.createElement("span");
      span.innerHTML = categories[i];
      catsDiv.appendChild(span);
    }
    let allSpans = document.querySelectorAll(".categories-spans span");
    allSpans.forEach(function (curr, i, arr) {
      curr.addEventListener("click", (e) => {
        arr.forEach((element) => {
          element.classList.remove("active-cat");
        });
        e.target.classList.add("active-cat");
        updateProducts(e.target.innerHTML);
      });
    });
  });

///////end categories //////////////////////////////////

////////start products//////////////////////////////////

function updateProducts(category) {
  let cat = "";
  if (category) {
    if (category == "all") {
      cat = "";
    } else {
      cat = `/category/${category}`;
    }
  }

  hideFetchErrorScreen();
  showLoadingScreen();
  fetch(`https://fakestoreapi.com/products${cat}`)
    .then((res) => res.json())
    .then((products) => {
      productsBox.innerHTML = "";
      console.log(products);
      for (let i = 0; i < products.length; i++) {
        let currentProd = createCard(products[i]);
        productsBox.appendChild(currentProd);
      }
      hideLoadingScreen();
    })
    .catch(() => {
      showFetchErrorScreen();
    });
}

updateProducts();
console.log("cart:" + getCart().length);


//Logout
document.getElementById("logoutBtn").addEventListener("click", function () {
    sessionStorage.removeItem("currentUser");
    location.href = "login.html";
});




// Slider
/////////////////////////////////////////////

const slides = document.querySelectorAll(".slider img");
const bullets = document.querySelectorAll(".slider .bullets li");
const leftBtn = document.getElementById("slider-left");
const rightBtn = document.getElementById("slider-right");

let current = 0;
let autoSlide;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  bullets.forEach((bullet, i) => {
    bullet.classList.toggle("active-bullet", i === index);
  });

  current = index;
}

function nextSlide() {
  let next = (current + 1) % slides.length;
  showSlide(next);
}

function prevSlide() {
  let prev = (current - 1 + slides.length) % slides.length;
  showSlide(prev);
}

// Controls
if (rightBtn) {
  rightBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });
}

if (leftBtn) {
  leftBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });
}

// Bullets
bullets.forEach((bullet, i) => {
  bullet.addEventListener("click", () => {
    showSlide(i);
    resetAutoSlide();
  });
});

// Auto slide every 3 seconds
function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 3000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

// Initialize
if (slides.length > 0) {
  showSlide(0);
  startAutoSlide();
}
