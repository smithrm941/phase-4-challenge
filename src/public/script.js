console.log('hello from the browser JavaScript')
const newReviewButton = document.getElementById('new-review-button')
const reviewPostedAlert = document.getElementById('review-posted-alert')

newReviewButton.addEventListener("click", () => {
  reviewPostedAlert.style.display = "block";
})
