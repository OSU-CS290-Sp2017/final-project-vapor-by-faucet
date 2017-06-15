




function newcomment(newtext, newusr, newrating){

  var postURL = window.location.pathname + '/newcomment';
  var postRequest = new XMLHttpRequest();
  postRequest.open('POST', postURL);
  postRequest.setRequestHeader('Content-Type', 'application/json');

  postRequest.addEventListener('load', function(event){
    var error;
    if (event.target.status == 200){
      location.reload();
    }
    else {
      error = event.target.response;
      alert(error);
    }
  });

  var postBody = {
    comment: newtext,
    author: newusr,
    rating: newrating
  };
  postRequest.send(JSON.stringify(postBody));

}



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


  if(document.querySelector('.game-page')){
    var submitbutton = document.getElementById('new-comment-button');
    submitbutton.addEventListener('click', function(){
      var newtext = document.getElementById('comment-input-text').value;
      var newusr = document.getElementById('comment-input-user').value;
      var newrating = document.getElementById('rating-input').value;
      if (!(newtext && newusr && newrating)){
        alert("You must complete all three fields to post a comment!");
      }

      else{
        newcomment(newtext, newusr, newrating);
      }


    });


  }




})
