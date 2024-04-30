// Function to fetch bike details from JSON file
async function fetchBikeDetails() {
  try {
    const response = await fetch('bikes.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bike details:', error);
    return [];
  }
}

// Function to display bike details
async function displayBikeDetails(bikeName) {
  const bikes = await fetchBikeDetails();
  const bike = bikes.find(b => b.name === bikeName);

  if (bike) {
    const modal = document.getElementById('bikeDetailsModal');
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
      <span class="icon-close3">
         <ion-icon name="close"></ion-icon>
      </span>
      <div class="bike-details">
        <div class="bike-image">
          <img src="${bike.image}" alt="${bike.name}">
        </div>
        <div class="bike-info">
          <h2>${bike.name}</h2>
          <p><strong>Description:</strong> ${bike.description}</p>
          <p><strong>Price:</strong> ${bike.price}</p>
          <p><strong>Engine:</strong> ${bike.engine}</p>
          <p><strong>Transmission:</strong> ${bike.transmission}</p>
          <p><strong>Fuel Capacity:</strong> ${bike.fuelCapacity}</p>
          ${bike.seatHeight ? `<p><strong>Seat Height:</strong> ${bike.seatHeight}</p>` : ''}
          ${bike.groundClearance ? `<p><strong>Ground Clearance:</strong> ${bike.groundClearance}</p>` : ''}
          <p><strong>Color Options:</strong> ${bike.colorOptions.join(', ')}</p>
          <a href="${bike.onRoadPriceLink}" target="_blank" class="btn">Check on-road price</a>
        </div>
      </div>
    `;
    modal.style.display = 'block';

    // Close the modal when the user clicks on the close button
    document.querySelector('.icon-close3').addEventListener('click', function() {
      modal.style.display = 'none';
    });
  } else {
    console.error(`Bike "${bikeName}" not found.`);
  }
}

// Close the modal when the user clicks outside of it
window.addEventListener('click', function(event) {
  const modal = document.getElementById('bikeDetailsModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Define the number of bikes per page
const bikesPerPage = 6;
// Get the total number of bikes
const totalBikes = document.querySelectorAll('.bike').length;
// Calculate the total number of pages
const totalPages = Math.ceil(totalBikes / bikesPerPage);
// Initialize the current page
let currentPage = 1;

// Function to display bikes based on the current page
function displayBikesByPage(page) {
  const startIndex = (page - 1) * bikesPerPage;
  const endIndex = startIndex + bikesPerPage;
  const allBikes = document.querySelectorAll('.bike');
  
  // Hide all bikes
  allBikes.forEach(bike => {
    bike.style.display = 'none';
  });

  // Display bikes for the current page
  for (let i = startIndex; i < endIndex && i < totalBikes; i++) {
    allBikes[i].style.display = 'block';
  }
}

// Function to generate pagination buttons
function generatePaginationButtons() {
  const pagination = document.getElementById('pagination');

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      displayBikesByPage(currentPage);
      updatePaginationButtons();
    });
    pagination.appendChild(button);
  }
}

// Function to update pagination button states
function updatePaginationButtons() {
  const buttons = document.querySelectorAll('#pagination button');
  buttons.forEach((button, index) => {
    if (index + 1 === currentPage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

// Display bikes for the initial page
displayBikesByPage(currentPage);

// Generate pagination buttons
generatePaginationButtons();

// Highlight the current page button
updatePaginationButtons();

document.addEventListener("DOMContentLoaded", function() {
  const paginationButtons = document.querySelectorAll('.pagination button');

  paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.classList.add('appear-animation');
      setTimeout(() => {
        button.classList.remove('appear-animation');
      }, 500);
    });
  });
});

// Function to open inventory popup
function openInventoryPopup() {
  document.getElementById('inventoryPopup').style.display = 'block';
}

// Find the Inventory link by its icon and text content
document.querySelector('.sidebar-content a[href="#"] i.fas.fa-box-open').closest('a').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default behavior of the link
  openInventoryPopup();
});
// Function to close inventory popup
function closeInventoryPopup() {
  document.getElementById('inventoryPopup').style.display = 'none';
}

// Find the close button and attach an event listener to it
document.querySelector('#inventoryPopup .popup-close').addEventListener('click', function() {
  closeInventoryPopup();
});

// Function to initialize the inventory array
let inventory = [];

// Function to display inventory
function displayInventory() {
  const inventoryElement = document.getElementById('inventoryContent');
  inventoryElement.innerHTML = ''; // Clear existing content

  inventory.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
      <p>${item.name}: ${item.quantity}</p>
      <button onclick="editItem(${index})">Edit</button>
      <button onclick="deleteItem(${index})">Delete</button>
    `;
    inventoryElement.appendChild(itemDiv);
  });
}

// Function to add item to inventory
function addItem(name, quantity) {
  inventory.push({ name, quantity });
  displayInventory();
}

// Function to edit item in inventory
function editItem(index) {
  const newName = prompt('Enter new name:');
  const newQuantity = parseInt(prompt('Enter new quantity:'), 10);
  if (newName !== null && newQuantity !== null) {
    inventory[index].name = newName;
    inventory[index].quantity = newQuantity;
    displayInventory();
  }
}

// Function to delete item from inventory
function deleteItem(index) {
  inventory.splice(index, 1);
  displayInventory();
}

// Function to handle form submission for adding new item
document.getElementById('addItemForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const itemName = document.getElementById('itemName').value;
  const itemQuantity = parseInt(document.getElementById('itemQuantity').value, 10);
  addItem(itemName, itemQuantity);
  document.getElementById('addItemForm').reset(); // Reset form fields
});

// Function to open inventory popup
function openInventoryPopup() {
  document.getElementById('inventoryPopup').style.display = 'block';
  displayInventory();
}

// Function to close inventory popup
function closeInventoryPopup() {
  document.getElementById('inventoryPopup').style.display = 'none';
}

// Call openInventoryPopup() when the "Inventory" link is clicked
document.querySelector('.sidebar-content a[href="#"]').addEventListener('click', function() {
  openInventoryPopup();
});

// Call closeInventoryPopup() when the "Close" button in the popup is clicked
document.querySelector('#inventoryPopup .popup-close').addEventListener('click', function() {
  closeInventoryPopup();
});

// Call closeInventoryPopup() when the user clicks outside the popup
window.onclick = function(event) {
  if (event.target == document.getElementById('inventoryPopup')) {
    closeInventoryPopup();
  }
};

// Call displayInventory() to initially display inventory
displayInventory();
