console.log("main.js is running on:", window.location.pathname);

// Define your page content population functions
async function populateHomePageContent() {
    console.log("🏠 Populating Home Page Content");
    let featuresMainCont = document.querySelector(".featuresMainCont");
    if (featuresMainCont) {
        try {
            const featureResponse = await fetch("jsonFiles/features.json");
            const featuressData = await featureResponse.json();

            featuressData.slice(0, 6).forEach(item => {
                const featureCont = document.createElement("div");
                featureCont.className = "featureCont";
                featureCont.innerHTML = `<img src="${item.image}" alt="${item.title}"><h4 style="background-color: ${item.color};">${item.title}</h4>`;
                featuresMainCont.appendChild(featureCont);
            });
        } catch (error) {
            console.error("Error populating features:", error);
        }
    } else {
        console.warn(".featuresMainCont not found on home page.");
    }



    let featuredProductsMainCont = document.querySelector(".featuredProductsMainCont");
    console.log("Inside populateShopPageContent, .featuredProductsMainCont:", featuredProductsMainCont);
    if (featuredProductsMainCont) {
        try {
            const featuredProductResponse = await fetch("jsonFiles/products.json");
            const featuredProductsData = await featuredProductResponse.json();
            featuredProductsData.slice(0, 8).forEach(item => {
                const featuredProductCont = document.createElement("div");
                featuredProductCont.className = "featuredProductCont";
                featuredProductCont.innerHTML = `<div class="featuredProductImgCont"><img src="${item.image}" alt="${item.title}" width="250" height="250"></div><div class="featuredProductContTxt"><h4>${item.title}</h4><span>⭐️⭐️⭐️⭐️⭐️</span><p>${item.price}</p></div>`;
                featuredProductsMainCont.appendChild(featuredProductCont);

                featuredProductCont.addEventListener("click", () => {
                    localStorage.setItem("selectedProduct", JSON.stringify(item));
                    window.location.href = "shop.html#productDetailsCont";
                });
            });
        } catch (error) {
            console.error("Error populating featured products for shop page:", error);
        }
    } else {
        console.error("❌ .featuredProductsMainCont not found on shop page — aborting population.");
    }


    let newArrivalsMainCont = document.querySelector(".newArrivalsMainCont");
    if (newArrivalsMainCont) {
        try {
            const newArrivalsResponse = await fetch("jsonFiles/products.json");
            const newArrivalsData = await newArrivalsResponse.json();
            newArrivalsData.slice(8, 16).forEach(item => {
                const newArrivalCont = document.createElement("div");
                newArrivalCont.className = "newArrivalCont";
                newArrivalCont.innerHTML = `<div class="newArrivalImgCont"><img src="${item.image}" alt="${item.title}" width="250" height="250"></div><div class="newArrivalContTxt"><h4>${item.title}</h4><span>⭐️⭐️⭐️⭐️⭐️</span><p>${item.price}</p></div>`;
                newArrivalsMainCont.appendChild(newArrivalCont);

                newArrivalCont.addEventListener("click", () => {
                    localStorage.setItem("selectedProduct", JSON.stringify(item));
                    window.location.href = "shop.html#productDetailsCont";
                });
            });
        } catch (error) {
            console.error("Error populating new arrivals:", error);
        }
    } else {
        console.warn(".newArrivalsMainCont not found on home page.");
    }


    let secBannerMainCont = document.querySelector(".secondaryBannerSection");
    if (secBannerMainCont) {
        try {
            const secBannerResponse = await fetch("jsonFiles/homePageBanners.json");
            const secBannerData = await secBannerResponse.json();
            secBannerData.slice(0, 3).forEach(item => {
                const secBannerCont = document.createElement("div");
                secBannerCont.className = "secBannerCont";
                secBannerCont.innerHTML = `<div class="secBannerCont" style="background-image: url('${item.image}'); background-size: cover; background-position: center; background-repeat: no-repeat;"><div class="secBannerContTxt"><h1>${item.title}</h1><p>${item.caption}</p></div></div>`;
                secBannerMainCont.appendChild(secBannerCont);
            });
        } catch (error) {
            console.error("Error populating secondary banners:", error);
        }
    } else {
        console.warn(".secondaryBannerSection not found on home page.");
    }
}

async function populateShopPageContent() {
    console.log("🛍️ Populating Shop Page Content");
    let featuredProductsMainCont = document.querySelector(".featuredProductsMainCont");
    let detailPageFeaturedCont = document.querySelector(".featuredProductsDetailPageCont");
    let productsCardSection = document.querySelector(".shopMainBody");
    let productsDetailSection = document.querySelector(".productsDetailSection");

    if (featuredProductsMainCont) {
        try {
            const featuredProductResponse = await fetch("jsonFiles/products.json");
            const featuredProductsData = await featuredProductResponse.json();

            document.getElementById("addToCartBtn").addEventListener("click", () => {
                const product = {
                    id: `product-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                    title: document.getElementById("productName").innerText,
                    price: document.getElementById("productPrice").innerText,
                    image: document.getElementById("productImage").src,
                    quantity: parseInt(document.getElementById("productQuantity").value, 10),
                    size: document.getElementById("sizeSelectCont").value
                };

                cartFunction(product);
                 loadCartCount();  
             
                alert("Item added to the cart!!");
            });


            document.getElementById("backArrow").addEventListener("click", function (e) {
                e.preventDefault();

                productsDetailSection.classList.add("hidden");
                productsCardSection.classList.remove("hidden");

                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
                    document.body.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
            });

            featuredProductsData.forEach(item => {
                const featuredProductCont = document.createElement("div");
                featuredProductCont.className = "featuredProductCont";

                featuredProductCont.innerHTML = `
                <div class="featuredProductImgCont">
                    <img src="${item.image}" alt="${item.title}" width="250" height="250">
                </div>
                <div class="featuredProductContTxt">
                    <h4>${item.title}</h4>
                    <span>⭐️⭐️⭐️⭐️⭐️</span>
                    <p>${item.price}</p>
                </div>
            `;

                // Append product to main container
                featuredProductsMainCont.appendChild(featuredProductCont);

                // Add click event to show product details
                featuredProductCont.addEventListener("click", () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });

                    productsCardSection.classList.add("hidden");
                    productsDetailSection.classList.remove("hidden");

                    document.getElementById("productCategory").innerText = item.category;
                    document.getElementById("productName").innerText = item.title;
                    document.getElementById("productPrice").innerText = item.price;
                    document.getElementById("productDescription").innerText = item.description;
                    document.getElementById("productImage").src = item.image;
                    document.getElementById("productImage").alt = item.title;

                    resetSizeAndPrice();

                });

            });

            function resetSizeAndPrice() {
                const sizeSelect = document.getElementById("sizeSelectCont");
                const defaultSize = "XXL";
                const priceElement = document.getElementById("productPrice");
                const basePrice = parseFloat(priceElement.innerText.replace("$", ""));

                sizeSelect.value = defaultSize;

                let newPrice = basePrice;
                if (defaultSize === "XXL") {
                    newPrice = basePrice + 30;
                }
                priceElement.innerText = `$${newPrice}`;

                sizeSelect.onchange = () => {
                    const selectedSize = sizeSelect.value;
                    let updatedPrice = basePrice;

                    if (selectedSize === "XXL") {
                        updatedPrice = basePrice + 30;
                    } else if (selectedSize === "XL" || selectedSize === "Large") {
                        updatedPrice = basePrice + 20;
                    } else if (selectedSize === "Small") {
                        updatedPrice = basePrice - 15;
                    }
                    priceElement.innerText = `$${updatedPrice}`;
                };
            }

            featuredProductsData.slice(0, 4).forEach(item => {
                const featuredProductCont = document.createElement("div");
                featuredProductCont.className = "featuredProductCont";

                featuredProductCont.innerHTML = `
                <div class="featuredProductImgCont">
                    <img src="${item.image}" alt="${item.title}" width="250" height="250">
                </div>
                <div class="featuredProductContTxt">
                    <h4>${item.title}</h4>
                    <span>⭐️⭐️⭐️⭐️⭐️</span>
                    <p>${item.price}</p>
                </div>
            `;
                detailPageFeaturedCont.appendChild(featuredProductCont);

                featuredProductCont.addEventListener("click", () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });

                    document.getElementById("productCategory").innerText = item.category;
                    document.getElementById("productName").innerText = item.title;
                    document.getElementById("productPrice").innerText = item.price;
                    document.getElementById("productDescription").innerText = item.description;
                    document.getElementById("productImage").src = item.image;
                    document.getElementById("productImage").alt = item.title;

                    resetSizeAndPrice();
                });
            });

        } catch (error) {
            console.error("Error populating featured products for shop page:", error);
        }
    } else {
        console.error("❌ .featuredProductsMainCont not found on shop page — aborting population.");
    }

    const selectedProduct = localStorage.getItem("selectedProduct");
    if (selectedProduct) {
        const item = JSON.parse(selectedProduct);

        // Show product detail section
        productsCardSection.classList.add("hidden");
        productsDetailSection.classList.remove("hidden");

        // Populate product detail
        document.getElementById("productCategory").innerText = item.category;
        document.getElementById("productName").innerText = item.title;
        document.getElementById("productPrice").innerText = item.price;
        document.getElementById("productDescription").innerText = item.description;
        document.getElementById("productImage").src = item.image;
        document.getElementById("productImage").alt = item.title;

        resetSizeAndPrice();

        localStorage.removeItem("selectedProduct");

    }
}
async function populateBlogPageContent() {

    console.log("🛍️ Populating Blog Page Content");
    let blogBoxesMainCont = document.querySelector(".blogBoxesMainCont");
    if (blogBoxesMainCont) {
        let blogsBoxesResponse = await fetch("jsonFiles/blog.json");
        let blogsBoxesData = await blogsBoxesResponse.json();

        blogsBoxesData.forEach(item => {
            const blogBoxesCont = document.createElement("div");
            blogBoxesCont.className = "blogBoxesCont";

            blogBoxesCont.innerHTML = `
              <div class="blogImgCont">
            <h1 class="blogDate">${item.date}</h1>
            <img src="${item.image}" alt="" class="blogImg" width="400" height="250">
        </div>
        <div class="blogTxtCont">
            <h3 class="blogHeading">${item.heading}</h3>
            <p class="blogDescription">${item.description}</p>
            <a class="continueBtn" href="${item.link}" target="blank" >CONTINUE READING ----</a>
        </div>
            `;

            blogBoxesMainCont.appendChild(blogBoxesCont);

        });
    }

}

async function populateAboutPageContent() {
    let featuresMainCont = document.querySelector(".featuresMainCont");
    if (featuresMainCont) {
        try {
            const featureResponse = await fetch("jsonFiles/features.json");
            const featuressData = await featureResponse.json();

            featuressData.slice(0, 6).forEach(item => {
                const featureCont = document.createElement("div");
                featureCont.className = "featureCont";
                featureCont.innerHTML = `<img src="${item.image}" alt="${item.title}"><h4 style="background-color: ${item.color};">${item.title}</h4>`;
                featuresMainCont.appendChild(featureCont);
            });
        } catch (error) {
            console.error("Error populating features:", error);
        }
    } else {
        console.warn(".featuresMainCont not found on home page.");
    }
}

async function cartFunction(product) {
    console.log("cartFunction called with product:", product);
    let cartDetailsCont = document.querySelector(".cartDetailsCont");
    if (cartDetailsCont) {
        console.log(".cartDetailsCont found in DOM.");
        const cartItemsCont = document.createElement("div");
        cartItemsCont.classList.add("cartItemsCont");

        // Calculate subtotal (strip currency symbol if needed)
        const priceNumber = parseFloat(product.price.replace("$", ""));
        const subtotal = (priceNumber * product.quantity).toFixed(2);

        cartItemsCont.innerHTML = `
            <i class="fa-solid fa-xmark removeCartItemBtn"></i>
            <img src="${product.image}" alt="${product.title}" class="cartItemImg">
            <p class="cartItemName">${product.title} (${product.size})</p>
            <p class="cartItemPrice">${product.price}</p>
            <p class="cartItemQuantity">${product.quantity}</p>
            <p class="cartItemsTotal">$${subtotal}</p>
        `;

        cartDetailsCont.appendChild(cartItemsCont);
        console.log("Appended new cart item to DOM.");

        saveCartItem(product);
    } else {
        console.warn(".cartDetailsCont not found in DOM. Item not appended.");
        saveCartItem(product);
    }
}

function saveCartItem(product) {
    console.log("Saving product to localStorage:", product);
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Create a copy of product without size property
    const { size, ...productWithoutSize } = product;

    existingCart.push(productWithoutSize);
    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    console.log("Current cart in localStorage:", existingCart);
}

function loadCartItems() {
    const cartDetailsCont = document.querySelector(".cartDetailsCont");
    let allItemsTotal = document.querySelectorAll(".allItemsTotal");
    let totalOfItems = 0.00;
    let couponCode = "ZaidCara70";
    let couponApplyBtn = document.getElementById("coupounApplyBtn");
    let couponApplied = false;

    if (!cartDetailsCont) {
        console.warn(".cartDetailsCont container not found in DOM, cannot load cart items.");
        return;
    }

    console.log("Loading cart items from localStorage...");
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log("Saved cart items:", savedCart);

    savedCart.forEach(product => {
        const cartItemsCont = document.createElement("div");
        cartItemsCont.classList.add("cartItemsCont");

        const priceNumber = parseFloat(product.price.replace("$", ""));
        const subtotal = (priceNumber * product.quantity).toFixed(2);

        cartItemsCont.innerHTML = `
          <i class="fa-solid fa-xmark removeCartItemBtn"></i>
          <img src="${product.image}" alt="${product.title}" class="cartItemImg">
          <p class="cartItemName">${product.title}</p>
          <p class="cartItemPrice">${product.price}</p>
          <p class="cartItemQuantity">${product.quantity}</p>
          <p class="cartItemsTotal">$${subtotal}</p>
        `;

        cartDetailsCont.appendChild(cartItemsCont);

        console.log("Appended product to cartDetailsCont:", product.title);

        const removeBtn = cartItemsCont.querySelector(".removeCartItemBtn");

        removeBtn.addEventListener("click", () => {
            const cartItemElement = removeBtn.parentElement;
            cartItemElement.remove();

            const id = product.id;

            let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            cartItems = cartItems.filter(item => item.id !== id);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
                 loadCartCount(); 

            console.log(`Removed item ${id} from cart and localStorage.`);

            totalOfItems = Number(totalOfItems) - Number(subtotal);
            allItemsTotal.forEach(item => {
                item.innerText = `$${totalOfItems}`;
            });

        });

        totalOfItems = Number(totalOfItems) + Number(subtotal);
    });


    if (couponApplied) {
        let discountedTotal = totalOfItems - (totalOfItems * 0.7);
        allItemsTotal.forEach(item => {
            item.innerText = `$${discountedTotal}`;
        });

    } else {
        allItemsTotal.forEach(item => {
            item.innerText = `$${totalOfItems}`;
        });
    }

    // flag to prevent multiple use

    couponApplyBtn.addEventListener("click", () => {
        let couponCodeInput = document.getElementById("coupounInput").value.trim();

        if (couponApplied) {
            alert("⚠️ Coupon has already been applied.");
            return;
        }

        if (couponCodeInput === couponCode) {
            let discountedTotal = totalOfItems - (totalOfItems * 0.7); // 70% off

            alert("✅ 70% Discount Applied!");

            allItemsTotal.forEach(item => {
                item.innerText = `$${discountedTotal.toFixed(2)}`;
            });

            couponApplied = true; // mark as used
        } else {
            alert("❌ Invalid coupon code.");

        }
    });


} async function signInOverlayFunc() {

    try {
        let response = await fetch("components/signInOverlay.html");
        let data = await response.text();
        document.body.insertAdjacentHTML("beforeend", data);
    } catch (err) {
        return;
    }

    const signInLink = document.getElementById("signInLink");
    const signInMainCont = document.querySelector(".signInMainCont");
    const signInBtn = document.getElementById("signInBtn");
    const closeBtn = document.querySelector(".OverlayRemoveBtn");

    if (signInLink) {
        signInLink.addEventListener("click", () => {
            document.getElementById("signInSection").classList.remove("hidden");
            signInMainCont.classList.remove("hidden");
            document.querySelector(".section").style.filter = "blur(10px)";
        });
    } else {
        console.warn("[SignInOverlay] ⚠️ Sign-in link not found on this page.");
    }

    if (signInBtn) {
        signInBtn.addEventListener("click", () => {
            const name = document.getElementById("signInName").value.trim();
            const email = document.getElementById("signInEmail").value.trim();
            const pass = document.getElementById("signInPass").value.trim();

            if (!name || !email || !pass) {
                alert("Enter Correct Info Please!!");
            } else {
                console.log("[SignInOverlay] ✅ Form submitted successfully.");
                document.getElementById("signInForm").reset();
                alert("Successfully Signed In");
                signInMainCont.classList.add("hidden");
            }
        });
    } else {
        console.warn("[SignInOverlay] ⚠️ Sign-in button not found.");
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            document.getElementById("signInSection").classList.add("hidden");
            signInMainCont.classList.add("hidden");
            document.querySelector(".section").style.filter = "none";
        });
    } else {
        console.warn("[SignInOverlay] ⚠️ Close button (.OverlayRemoveBtn) not found.");
    }
}
function helpPageFunc() {
    let faqItem = document.querySelectorAll(".faqItem");
    console.log(faqItem);

    faqItem.forEach(item => {
        const arrow = item.querySelector(".fa-downArrow");
        const answer = item.querySelector(".answer");

        arrow.addEventListener("click", () => {
            if (arrow.classList.contains("fa-angle-down")) {
                answer.classList.remove("hidden");
                arrow.classList.remove("fa-angle-down");
                arrow.classList.add("fa-angle-up");
            } else if (arrow.classList.contains("fa-angle-up")) {
                answer.classList.add("hidden");
                arrow.classList.add("fa-angle-down");
                arrow.classList.remove("fa-angle-up");
            }
        });
    });

}

function loadCartCount() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const count = cartItems.length;
    console.log("Cart contains:", count, "items");

    const cartCountElement = document.querySelector(".cartItemsCount");
    if (cartCountElement) {
        cartCountElement.innerText = count;
    }
      if (count === 0) {
            cartCountElement.style.backgroundColor = "transparent";
            cartCountElement.innerText = ''; 
        }else {
            cartCountElement.style.backgroundColor = "#017065"; // restore teal if needed
        }   
}


// --- Main Entry Point Logic (Modified to handle DOMContentLoaded timing) ---
function initializePageContent() {
    const pageId = document.body.id;
    console.log("Current body ID:", pageId);

    if (pageId === "homePage") {
        console.log("🏠 Home page detected - calling populateHomePageContent()");
        populateHomePageContent();
    } else if (pageId === "shopPage") {
        console.log("🛍️ Shop page detected - calling populateShopPageContent()");
        populateShopPageContent();
    } else if (pageId === "blogPage") {
        console.log("🛍️ Blog page detected - calling populateBlogPageContent()");
        populateBlogPageContent();
    } else if (pageId === "aboutUsPage") {
        populateAboutPageContent();
    } else if (pageId === "cartPage") {
        loadCartItems();
    } else if (pageId === "helpPage") {
        helpPageFunc();
    }
    else {
        console.warn("Unknown page ID:", pageId);
    }
}
document.addEventListener("DOMContentLoaded", () => {
  if (window.componentsAreLoaded) {
    initializePageContent();
  } else {
    document.addEventListener("componentsLoaded", () => {
      initializePageContent();
    });
  }
});
console.log("End of mainScript.js file.");