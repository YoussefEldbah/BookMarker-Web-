var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var siteList;
var errorMessage = document.getElementById("errorMessage");

// Check if there are any saved sites in localStorage
if (localStorage.getItem("sites") == null) {
    siteList = [];
} else {
    siteList = JSON.parse(localStorage.getItem("sites"));
    displayurl();  // Display sites on page load
}

// Function to add a new site
function add() {
    if (validateUrl() && validateUrlName()) {
        var aboutSite = {
            WebsiteName: siteNameInput.value,
            url: siteUrlInput.value
        };
        siteList.push(aboutSite);
        localStorage.setItem("sites", JSON.stringify(siteList));  // Save updated list to localStorage
        displayurl();  // Update the display with the new site
        clearform();  // Clear the form inputs
        errorMessage.textContent = ""; // Clear any previous error message
        console.log(siteList);  // Log to check the list
    } else {
        errorMessage.textContent = "Please correct the highlighted fields.";  // Show error message
    }
}

// Function to display all sites in the table
function displayurl() {
    var cartoona = "";
    for (var i = 0; i < siteList.length; i++) {
        cartoona += `
            <tr>
                <td> ${i + 1} </td>
                <td> ${siteList[i].WebsiteName} </td>
                <td><button onclick="visitWebsite(event)" data-index="${i}" class="btn btn-warning">Visit</button></td>
                <td><button onclick="editSite(${i})" class="btn btn-info">Edit</button></td>
                <td><button onclick="deleteurl(${i})" class="btn btn-danger">Delete</button></td>
            </tr>
        `;
    }
    document.getElementById("zz").innerHTML = cartoona;  // Update the table with the generated rows
}

// Function to clear the form inputs after adding a site
function clearform() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

// Function to delete a site from the list
function deleteurl(index) {
    siteList.splice(index, 1);  // Remove the site from the list
    localStorage.setItem("sites", JSON.stringify(siteList));  // Update localStorage
    displayurl();  // Re-render the table with the updated list
}

// Function to validate the site name input (3-8 letters only)
function validateUrlName() {
    var regex = /^[A-Za-z]{3,8}$/;  // Validate that the site name is between 3 and 8 characters
    if (regex.test(siteNameInput.value)) {
        siteNameInput.style.border = "none";  // Remove red border if valid
        return true;
    } else {
        siteNameInput.style.border = "2px solid #dc3545";  // Red border for invalid input
        return false;
    }
}

// Function to validate the site URL input (proper URL format)
function validateUrl() {
    var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    if (regex.test(siteUrlInput.value)) {
        siteUrlInput.style.border = "none";  // Remove red border if valid
        return true;
    } else {
        siteUrlInput.style.border = "2px solid #dc3545";  // Red border for invalid input
        return false;
    }
}

// Function to visit a website (opens in a new tab)
function visitWebsite(e) {
    var websiteIndex = e.target.dataset.index;
    var httpsRegex = /^https?:\/\//;  // Check if URL starts with "http://" or "https://"
    if (httpsRegex.test(siteList[websiteIndex].url)) {
        window.open(siteList[websiteIndex].url, '_blank');  // Open URL in new tab
    } else {
        window.open(`https://${siteList[websiteIndex].url}`, '_blank');  // Add "https://" if missing
    }
}

// Function to edit a site
function editSite(index) {
    siteNameInput.value = siteList[index].WebsiteName;
    siteUrlInput.value = siteList[index].url;
    
    // Change the add button to update button
    var addButton = document.getElementById('addButton');
    addButton.textContent = "Update Site";
    addButton.setAttribute("onclick", `updateSite(${index})`);
}

// Function to update a site after editing
function updateSite(index) {
    if (validateUrl() && validateUrlName()) {
        siteList[index].WebsiteName = siteNameInput.value;
        siteList[index].url = siteUrlInput.value;

        localStorage.setItem("sites", JSON.stringify(siteList));  // Save updated list to localStorage
        displayurl();  // Update the display with the updated site
        clearform();  // Clear the form inputs
        errorMessage.textContent = ""; // Clear any previous error message
        console.log(siteList);  // Log to check the list

        // Reset the button back to "Add Site"
        var addButton = document.getElementById('addButton');
        addButton.textContent = "Add Site";
        addButton.setAttribute("onclick", "add()");
    } else {
        errorMessage.textContent = "Both site name and URL are invalid. Please correct them.";  // Show error message
    }
}
