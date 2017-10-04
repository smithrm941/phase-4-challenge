document.addEventListener("DOMContentLoaded", function(event) {
  const deleteReviewButtons = document.querySelectorAll('.authored-review > .fa.fa-trash')

  for(let i = 0 ; i < deleteReviewButtons.length ; i++) {
  deleteReviewButtons[i].addEventListener('click', function() {

    let individualAlbum = document.getElementById('individual-album')

    if(individualAlbum) {
      let deleteConfirmation = deleteReviewButtons[i].parentNode.childNodes[7]
      deleteConfirmation.style.display = "block"

    } else if (!individualAlbum){
      let deleteConfirmation = deleteReviewButtons[i].parentNode.childNodes[3]
      deleteConfirmation.style.display = "block"

    }
    })
  };
});
