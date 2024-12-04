// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

//home section1 carousel
const swiper = new Swiper(".swiper-container", {
  slidesPerView: "3",
  spaceBetween: 20,
  loop: true,
  speed: 2000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  breakpoints: {
    1024: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 1.5,
    },
    370: {
      slidesPerView: 1,
    },
    0: {
      slidesPerView: 0.75,
    },
  },
});

let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;
  swiper.params.autoplay.reverseDirection = currentScroll <= lastScrollTop;
  swiper.update();
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

//header $ footer loading
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  let headerPath = "";
  let footerPath = "";

  // Define paths for header and footer
  if (
    currentPath.includes("services.html") ||
    currentPath.includes("case.html") ||
    currentPath.includes("index.html") ||
    currentPath.includes("contact.html") ||
    currentPath.endsWith("/")
  ) {
    headerPath = "files/header&Footer/header.html";
    footerPath = "files/header&Footer/footer.html";
  }

  // Load header
  fetch(headerPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load header.html");
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("header-container").innerHTML = html;
      headerScript(); // Call header-related scripts
      setActiveNav();
    })
    .catch((error) => {
      console.error("Error loading header:", error);
    });

  // Load footer
  fetch(footerPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load footer.html");
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("footer-container").innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading footer:", error);
    });
});

// Header-specific logic
function headerScript() {
  const hamburger = document.querySelector(".hamburger input");
  const smallDevices = document.querySelector(".smallDevices");
  const a = document.querySelectorAll(".header .smallDevices ul li a");
  const body = document.body;
  const tableColumnsIcons = document.querySelectorAll(".fa-table-columns");
  const headerContact = document.querySelector(".headerContact");

  hamburger.addEventListener("change", function () {
    if (hamburger.checked) {
      openHamburgerMenu();
    } else {
      closeHamburgerMenu();
    }
  });

  document.addEventListener("click", (e) => {
    if (
      hamburger.checked &&
      !smallDevices.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeHamburgerMenu();
    }
  });

  tableColumnsIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      if (hamburger.checked) {
        closeHamburgerMenu(() => {
          headerContact.style.transform = "translateY(0)";
        });
      } else {
        headerContact.style.transform = "translateY(0)";
      }
    });
  });

  window.addEventListener("scroll", () => {
    headerContact.style.transform = "translateY(-100%)";
  });

  function openHamburgerMenu() {
    smallDevices.style.transform = "translateX(0)";
    body.classList.add("no-scroll");
    a.forEach((element, index) => {
      setTimeout(() => {
        element.style.top = "0";
      }, index * 150);
    });
  }

  function closeHamburgerMenu(callback) {
    a.forEach((element, index) => {
      setTimeout(() => {
        element.style.top = "100%";
      }, index * 150);
    });

    setTimeout(() => {
      smallDevices.style.transform = "translateX(100%)";
      body.classList.remove("no-scroll");
      hamburger.checked = false;
      if (callback) callback();
    }, a.length * 150);
  }

  //textAnimation
  function animateText() {
    const textElement = document.querySelector(".animateText");
    let position = 0;
    let opacity = 0;
    let direction = 1;

    setInterval(() => {
      position += 0.5 * direction;
      opacity += 0.02 * direction;

      if (position >= 20 || position <= 0) {
        direction *= -1;
      }

      textElement.style.transform = `translateY(${position}px)`;
      textElement.style.opacity = opacity;
    }, 20);
  }

  animateText();
}

//active nav header
function setActiveNav() {
  const currentPage = window.location.pathname.split("/").pop(); // Get the current page's filename (e.g., index.html)
  const navLinks = document.querySelectorAll("ul li a");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href").split("/").pop(); // Get the filename part of the href (e.g., index.html)

    // If the link's href matches the current page, add the 'active' class
    if (currentPage === linkHref) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

//tilt for card hover effect
VanillaTilt.init(
  document.querySelectorAll(
    ".homeSection2 .styleCards .row .col-md-4 .card, .homeSection2 .parcentageInHome .container .row .col-md-4, .serviceSection1 .card"
  ),
  {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
    overflow: true,
  }
);

//text autoBlurAnimation
function autoBlurAnimationY() {
  const words = document.querySelectorAll(".autoBlurAnimation");

  words.forEach((word) => {
    ScrollTrigger.create({
      trigger: word,
      start: "top 55%",
      end: "bottom 45%",
      onEnter: () => {
        gsap.to(word, { filter: "blur(0px)" });
      },
      onLeave: () => {
        gsap.to(word, { filter: "blur(10px)" });
      },
      onEnterBack: () => {
        gsap.to(word, { filter: "blur(0px)" });
      },
      onLeaveBack: () => {
        gsap.to(word, { filter: "blur(10px)" });
      },
    });
  });
}
autoBlurAnimationY();

// Initialize Swiper for home section
var swiperHome = new Swiper(".swiper", {
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 0,
  mousewheel: {
    releaseOnEdges: true,
    sensitivity: 0.1,
    eventsTarget: ".swiper",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  speed: 1500,
});
