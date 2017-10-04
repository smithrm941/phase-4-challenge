document.addEventListener("DOMContentLoaded", function(event) {
  const singleReviews = document.querySelectorAll('.single-review > .fa-trash')

  for(let i = 0 ; i < singleReviews.length ; i++) {
  singleReviews[i].addEventListener('click', function() {
      let deleteConfirmation = document.getElementById('delete-confirmation')
      deleteConfirmation.style.display = "block"
    })
  };

});
