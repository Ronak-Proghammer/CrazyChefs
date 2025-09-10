/**
 * Template Name: NiceRestaurant
 * Template URL: https://bootstrapmade.com/nice-restaurant-bootstrap-template/
 * Updated: Jun 06 2025 with Bootstrap v5.3.6
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  const dropdown = document.getElementById("categoryDropdown");
  const searchBox = document.getElementById("searchBox");
  const sections = document.querySelectorAll(".menu-section");
  const noResults = document.getElementById("noResults");
  const menuHeader = document.getElementById("menuHeader");
  const menuWrapper = document.querySelector(".menu-wrapper"); // wrapper around all menu sections

  window.addEventListener("scroll", () => {
    const wrapperTop = menuWrapper.offsetTop;
    const wrapperBottom = wrapperTop + menuWrapper.offsetHeight;
    const scrollY = window.scrollY;

    if (scrollY > wrapperTop && scrollY < wrapperBottom - 200) {
      // Inside menu area → sticky
      menuHeader.classList.add("sticky-top-menu");
    } else {
      // Outside menu area → normal
      menuHeader.classList.remove("sticky-top-menu");
    }
  });

  let isProgrammaticScroll = false;

  // Scroll to section with offset
  dropdown.addEventListener("change", function () {
    const target = document.getElementById(this.value);
    const headerOffset = menuHeader.offsetHeight + 140;
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    isProgrammaticScroll = true; // ⬅️ block highlight logic
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });

    // release the flag after scroll finishes
    setTimeout(() => {
      isProgrammaticScroll = false;
      dropdown.value = this.value; // ⬅️ ensure correct item stays selected
    }, 700);
  });

  window.addEventListener("scroll", () => {
    if (isProgrammaticScroll) return; // ⬅️ skip if dropdown just triggered scroll
    if (searchBox.value.trim() !== "") return;

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - (menuHeader.offsetHeight + 140);
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
    if (current) dropdown.value = current;
  });

  // Search filter
  searchBox.addEventListener("input", function () {
    let filter = this.value.toLowerCase();
    let hasResults = false;

    if (filter) {
      dropdown.innerHTML = "<option selected disabled>Search Results</option>";
    } else {
      // Reset dropdown if cleared
      dropdown.innerHTML = `
  <option value="salads">Salads</option>
  <option value="fries">Crazy Fries</option>
  <option value="snacks">Snacks</option>
  <option value="bowls">Rice Bowls</option>
  <option value="breakfast">Breakfast & Sandwiches</option>
  <option value="pasta">Pasta</option>
  <option value="desserts">Desserts</option>
  <option value="drinks">Hot & Cold Drinks</option>
`;
    }

    sections.forEach((section) => {
      let items = section.querySelectorAll(".menu-item");
      let visibleCount = 0;
      items.forEach((item) => {
        if (item.textContent.toLowerCase().includes(filter)) {
          item.style.display = "";
          visibleCount++;
          hasResults = true;
        } else {
          item.style.display = "none";
        }
      });
      section.style.display =
        (visibleCount > 0 && filter) || !filter ? "" : "none";
    });

    noResults.style.display = hasResults ? "none" : filter ? "block" : "none";
  });
})();
