var btn = document.querySelector('.menu-toogle');
var menu = document.querySelector('.main-nav-ls');
var content = document.querySelector('.form-block');
var accordion = document.querySelectorAll('.accordion-title');

btn.onclick = openMenu;
menu.onclick = closeMenu;
content.onclick = closeMenu;


function openMenu(e) {
  e.preventDefault();
  menu.style.left = 0;
}

function closeMenu() {
  menu.style.left = '-300px';
}

for (var i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener('click', function(){
    this.classList.toggle('active');
  })
}