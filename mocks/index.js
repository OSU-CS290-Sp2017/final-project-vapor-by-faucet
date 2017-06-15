
window.addEventListener('DOMContentLoaded', function(){

  function toggleActive(active, current){
    var navbaractive = document.querySelector('.'+active);
    var navbarnew = document.querySelector('.'+current);
    navbaractive.classList.toggle(active);
    navbarnew.classList.toggle(active);

  }


  if (document.URL.includes("xbox"))
    toggleActive("active", "xbox");

  else if (document.URL.includes("ps4"))
    toggleActive("active", "ps4");

  else if (document.URL.includes("switch"))
    toggleActive("active", "switch");

  else if (document.URL.includes("pc"))
    toggleActive("active", "pc");

  else
    toggleActive('active','home');

})
