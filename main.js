// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', () => {
  // linksContainer.classList.toggle('show-links'); //fixed height issues 
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

// ********** fixed navbar ************
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');
window.addEventListener('scroll', () => {
  const scrollHeight = window.scrollY;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add('fixed-nav');
  } else {
    navbar.classList.remove('fixed-nav');
  }
  if (scrollHeight > 700) {
    topLink.classList.add('show-link');
  } else {
    topLink.classList.remove('show-link');
  }
});
// ********** smooth scroll ************
const scrollLinks = document.querySelectorAll('.scroll-link');
// select links
scrollLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute('href').slice(1);
    const element = document.getElementById(id);
    // calculate the heights
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains('fixed-nav');
    let position = element.offsetTop - navHeight;
    if (!fixedNav) {
      position -= navHeight;
    }
    if (navHeight > 82) {
      position += containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position
    });
    linksContainer.style.height = 0;
  });
});

// ********** video controls ************
const videos = document.querySelectorAll('.video-container');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

videos.forEach((videos, index) => {
  videos.style.left = `${index * 100}%`;
});

let counter = 0;
nextBtn.addEventListener('click', () => {
  counter++;
  carousel();
});

prevBtn.addEventListener('click', () => {
  counter--;
  carousel();
});

function carousel() {
  // cycle through slides
  //if(counter===slides.length){
  //counter = 0;
  //}
  //if (counter < 0) {
  //counter = slides.length - 1;
  //}

  // no cycle just hide buttons
  if (counter < videos.length - 1) {
    nextBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
  }
  if (counter > 0) {
    prevBtn.style.display = "block";
  } else {
    prevBtn.style.display = "none";
  }

  videos.forEach((videos) => {
    videos.style.transform = `translateX(-${counter * 100}%)`;
  });
}
prevBtn.style.display = "none";

window.onload = function () {
  setTimeout(function(){
    var loaders = document.querySelectorAll('.loader');
    for (var i = 0; i < loaders.length; i++) {
      loaders[i].style.display = 'none';
    }
  }, 800);
}