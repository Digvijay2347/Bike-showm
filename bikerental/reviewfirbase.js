const firebaseConfig = {
    apiKey: "AIzaSyBFC24bjB7RcdeaRCjk9rIjKXabvemuGj0",
    authDomain: "portfolio-79d97.firebaseapp.com",
    databaseURL: "https://portfolio-79d97-default-rtdb.firebaseio.com",
    projectId: "portfolio-79d97",
    storageBucket: "portfolio-79d97.appspot.com",
    messagingSenderId: "404584990790",
    appId: "1:404584990790:web:2ed7353e56a1eb2118e247",
    measurementId: "G-39SMYVLSYN"
  };
  
  firebase.initializeApp(firebaseConfig);

var reviewFormDB = firebase.database().ref("reviewFormT");

document.getElementById("reviewFormT").addEventListener("submit", submitForm);

// Function to fetch and display reviews
function displayReviews() {
  reviewFormDB.once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var review = childSnapshot.val();
      var reviewHtml = `
        <div class="review">
          <p><strong>Name:</strong> ${review.reviewName}</p>
          <p><strong>Review:</strong> ${review.reviewcomment}</p>
          <p><strong>Rating:</strong> ${review.rating1}</p>
        </div>`;
      document.getElementById("reviews").insertAdjacentHTML("beforeend", reviewHtml);
    });
  });
}

// Display existing reviews on page load
displayReviews();

function submitForm(e) {
  e.preventDefault();

  var reviewName = document.getElementById("reviewName").value;
  var rating1 = document.getElementById("rating1").value;
  var reviewcomment = document.getElementById("reviewcomment").value;

  saveMessages(reviewName, rating1, reviewcomment);

  // Show alert
  var alertMessage = document.querySelector(".alert");
  alertMessage.style.display = "block";

  // Hide alert after 3 seconds
  setTimeout(() => {
    alertMessage.style.display = "none";
  }, 3000);

  // Reset the form
  document.getElementById("reviewFormT").reset();
}

const saveMessages = (reviewName, rating1, reviewcomment) => {
  var newReviewForm = reviewFormDB.push();
  newReviewForm.set({
    reviewName: reviewName,
    reviewcomment: reviewcomment,
    rating1: rating1,
  });

  // Add the new review to the displayed reviews
  var reviewHtml = `
    <div class="review">
      <p><strong>Name:</strong> ${reviewName}</p>
      <p><strong>Review:</strong> ${reviewcomment}</p>
      <p><strong>Review:</strong> ${rating1}</p>
    </div>`;
  document.getElementById("reviews").insertAdjacentHTML("beforeend", reviewHtml);
};


// Function to add a new review with proper styling and animation
function addReview(reviewName, rating1, reviewComment) {
    // Create a new review element
    var reviewElement = document.createElement("div");
    reviewElement.classList.add("review");
    reviewElement.innerHTML = `
      <p><strong>Name:</strong> ${reviewName}</p>
      <p><strong>Review:</strong> ${reviewComment}</p>
      <p><strong>Review:</strong> ${rating1}</p>
    `;
  
    // Append the new review element to the reviews container
    document.getElementById("reviews").appendChild(reviewElement);
  }
  
 
 