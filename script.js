function tme() {
  var a = 0;
  setInterval(function () {
    a = a + Math.floor(Math.random() * 20);
    if (a < 100) {
      document.querySelector(".loader h1").innerHTML = a + "%";
    } else {
      a = 100;
      document.querySelector(".loader h1").innerHTML = a + "%";
    }
  }, 100);
}

const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});

function cursorMovement() {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      ".cursor"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
  });
}

function firstPageAnime() {
  var tl = gsap.timeline();

  tl.to(".loader", {
    top: "-100vh",
    delay: 1,
    duration: 1.3,
    onStart: tme(),
  });

  tl.from(".nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })

    .to(".boundingelem", {
      y: 0,
      duration: 1.3,
      stagger: 0.2,
      delay: -1,
      ease: Expo.easeInOut,
      scrollTrigger: {
        trigger: ".bounding",
        scroller: "body",
        start: "top 100%",
        end: "bottom 10%",
        stagger: 0.5,
        scrub: 2,
      },
    })

    .from(".heroFooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -2,
      ease: Expo.easeInOut,
    });
}

cursorMovement();

firstPageAnime();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      //   duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff - 50,
      left: dets.clientX - 60,
      rotate: gsap.utils.clamp(-30, 30, diffrot),
    });
  });
});

function sendEmail() {
  const emailAddress = "ranasaad.8662@gmail.com";
  const subject = "";
  const body = "Hi, I would like to get in touch with you.";

  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // Open the default email client with the pre-filled information
  window.location.href = mailtoLink;
}

gsap.to(".iconset .circle", {
  y: 30,
  duration: 1,
  // stagger:0.4,
  yoyo: true,
  repeat: -1,
  delay: 1,
});

const menu = document.querySelector("#menuu");
const navItems = document.querySelectorAll(".navItems h4");

// Function to check screen width
function checkWidth() {
  // Implement your screen width check logic here
  return window.innerWidth >= 500; // For example, consider screens wider than 500px
}

// Function to show the navigation items
function showNavItems() {
  menu.style.opacity = 0;
  // menu.style.position = "fixed";
  // document.querySelector(".nav").style.position = "fixed";
  gsap.to(navItems, {
    opacity: 1,
    y: 30,
    duration: 0.3,
    stagger: 0.2,
    onComplete: () => {
      // Add a ScrollTrigger to reverse the animation when scrolling
      if (checkWidth()) {
        const triggerElement = document.querySelector(".nav .navItems");
      }
    },
  });
  var rev = document.querySelector("#revert");
  rev.addEventListener("click", function () {
    gsap.to(navItems, {
      opacity: 0,
      y: 30,
      duration: 0.1,
      stagger: 0.2,
    });
    menu.style.opacity = 1;
  });
}

function mblnav() {
  var navbar = document.querySelector(".nav");
  // navbar.style.display = "none";
  var navtl = gsap.timeline();
  navtl.to(navbar, {
    // display:"none",
    y: -100,
    ease: Expo.easeInOut,
    stagger: 0.2,
    duration: 1,
  });

  navtl.to(".navItemMobile", {
    display: "block",
    y: 0,
    duration: 1.3,
    stagger: 0.3,
    delay: -1,
    ease: Expo.easeInOut,
  });

  var closing = document.querySelector("#closebtn");

  closing.addEventListener("click", function () {
    navtl.to(navbar, {
      // display:"none",
      y: 0,
      ease: Expo.easeInOut,
      stagger: 0.2,
      duration: 1,
    });

    navtl.to(".navItemMobile", {
      // display: "none",
      y: -1000,
      duration: 1,
      stagger: 0.3,
      ease: Expo.easeInOut,
    });
  });
}

menu.addEventListener("click", function () {
  if (checkWidth()) {
    showNavItems();
  } else {
    mblnav();
  }
});
