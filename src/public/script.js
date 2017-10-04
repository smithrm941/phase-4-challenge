console.log('hello from the browser JavaScript')
const deleteReviewButton = document.getElementById('delete-review-button')
const deleteConfirmation = document.getElementById('delete-confirmation')

deleteReviewButton.addEventListener("click", () => {
  deleteConfirmation.style.display = "block";
})
