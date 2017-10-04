console.log('hello from the browser JavaScript')
const deleteReviewButtons = document.querySelectorAll('.delete-review-buttons')
const deleteConfirmation = document.getElementById('delete-confirmation')


deleteReviewButtons.forEach((deleteReviewButton)=> {
  deleteReviewButton.addEventListener("click", () => {
    console.log('I push the button')
    deleteConfirmation.style.display = "block";
  })
})
