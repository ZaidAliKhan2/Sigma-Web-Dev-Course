document.addEventListener("DOMContentLoaded", () => {
  async function loadComponent(id, filePath) {
    const container = document.getElementById(id);
    if (!container) {
      console.warn(`Container #${id} not found`);
      return;
    }

    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
      }
      container.innerHTML = await response.text();
      return true; 
    } catch (error) {
      console.error(`Error loading ${filePath}:`, error);
      return false; 
    }
  }

  Promise.all([
    loadComponent("navbar", "components/navbar.html"),
    loadComponent("footer", "components/footer.html"),
    loadComponent("newsLetter", "components/newsLetter.html")
  ]).then(() => {

        window.componentsAreLoaded = true;
    document.dispatchEvent(new Event("componentsLoaded"));

     signInOverlayFunc();
     loadCartCount();
    
    setTimeout(() => {
      $(document).ready(function () {
        $(".scroll").on("click", function (e) {
          const currentPage = document.body.id;
          const $link = $(this);

          const isSamePage =
            (currentPage === "shopPage" && $link.hasClass("shop")) ||
            (currentPage === "blogPage" && $link.hasClass("blog")) ||
            (currentPage === "aboutUsPage" && $link.hasClass("about")) ||
            (currentPage === "contactPage" && $link.hasClass("contact")) ||
            (currentPage === "homePage" && $link.hasClass("home"))||
            (currentPage === "cartPage" && $link.hasClass("cart"));

          if (isSamePage) {
            e.preventDefault(); // prevent reload when you're already on that page

            // Scroll only if staying on the same page
            $("html, body").animate(
              { scrollTop: 0 },
              {
                duration: 800,
                easing: "easeOutQuad",
                queue: false
              }
            );
          }
        });
      });
 const sectionLinks = [...document.querySelectorAll(".sectionLinks")];
  const sections = [...document.querySelectorAll(".section")];

  function updateActiveLinks() {
    sections.forEach(section => {
      const sectionId = section.id.toLowerCase();
      const correspondingLink = sectionLinks.find(link =>
        link.classList.contains(sectionId)
      );

      if (!correspondingLink) return;

      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        correspondingLink.classList.add("hover-active");
      } else {
        correspondingLink.classList.remove("hover-active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLinks);
  window.addEventListener("resize", updateActiveLinks);
  updateActiveLinks();
      // Hamburger menu toggle
      const navHamburger = document.querySelector(".navHamburger");
      const navHeadingCont = document.querySelector(".navHeadings");

      if (navHamburger && navHeadingCont) {
        navHamburger.addEventListener("click", () => {
          navHeadingCont.classList.toggle("show");
        });
      }
    }, 150); // 50ms delay
  });

});