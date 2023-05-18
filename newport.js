const body = document.body;
body.classList.add("dark-mode");


const projects = document.getElementById('projects');

// Recent Projects button
var recentBtn = document.querySelector(".recent-btn");
var recentRow = document.querySelector(".recent-row");

recentBtn.addEventListener("click", function () {
    recentBtn.classList.add("active");
    recentRow.classList.add("active");
    softwareBtn.classList.remove("active");
    softwareRow.classList.remove("active");
    gameBtn.classList.remove("active");
    gameRow.classList.remove("active");
    var scrollPosition = recentRow.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scroll({
      top: scrollPosition,
      behavior: 'smooth'
    });
});

// Games button
var gameBtn = document.querySelector(".game-btn");
var gameRow = document.querySelector(".game-row");

gameBtn.addEventListener("click", function () {
    gameBtn.classList.add("active");
    gameRow.classList.add("active");
    recentBtn.classList.remove("active");
    recentRow.classList.remove("active");
    softwareBtn.classList.remove("active");
    softwareRow.classList.remove("active");
    var scrollPosition = gameRow.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scroll({
      top: scrollPosition,
      behavior: 'smooth'
    });
});

// Software button
var softwareBtn = document.querySelector(".software-btn");
var softwareRow = document.querySelector(".software-row");

softwareBtn.addEventListener("click", function () {
    softwareBtn.classList.add("active");
    softwareRow.classList.add("active");
    recentBtn.classList.remove("active");
    recentRow.classList.remove("active");
    gameBtn.classList.remove("active");
    gameRow.classList.remove("active");
    var scrollPosition = softwareRow.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scroll({
      top: scrollPosition,
      behavior: 'smooth'
    });
});

// Stick button group to top when scrolled
var buttonGroup = document.querySelector(".button-group");
var buttonGroupTop = buttonGroup.offsetTop;

window.addEventListener("scroll", function() {
  if (window.pageYOffset >= buttonGroupTop) {
    buttonGroup.classList.add("sticky");
  } else {
    buttonGroup.classList.remove("sticky");
  }
});

