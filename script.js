// FetchData function

const fetchData = async () => {
  try {
    const checkboxes = document.querySelectorAll(
      '#filter-form input[type="checkbox"]',
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Generate a random page number between 1 and 1000
    const page = Math.floor(Math.random() * 1000) + 1;

    // Fetch
    const res = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${page}`,
    );
    const data = await res.json();
    const iiifUrl = data.config.iiif_url;

    // Clear the body or another container element
    document.querySelector("#artwork-container").innerHTML = "";

    // Create a new element for the hero section using the first artwork
    const firstArtwork = data.data[0];
    const heroImageUrl = `${iiifUrl}/${firstArtwork.image_id}/full/843,1000/0/default.jpg`;
    const heroElement = document.createElement("section");
    heroElement.className = "hero";
    heroElement.innerHTML = `<img src="${heroImageUrl}">`;

    // Append the hero section to the body
    document.querySelector("body").appendChild(heroElement);

    data.data.forEach((artwork) => {
      const imageUrl = `${iiifUrl}/${artwork.image_id}/full/843,1000/0/default.jpg`;

      // Create a new element for the box
      const boxElement = document.createElement("div");
      boxElement.className = "box";
      boxElement.innerHTML = `
            <img src="${imageUrl}">
            <h2>${artwork.title}</h2>
            <p>${artwork.dimensions}</p>
            <p>${artwork.artwork_type_title}</p>`;

      // Append the box to the #artwork-container
      document.querySelector("#artwork-container").appendChild(boxElement);
    });
  } catch (error) {
    console.error(error);
    // If a 403 or 404 error occurs, call the fetchData function again to load another set of artworks
    if (error.status === 403 || error.status === 404) {
      fetchData();
    }
  }
};

fetchData();

document.querySelector("#random-artwork").addEventListener("click", fetchData);

// Filter logic

function getCheckedValues() {
  const checkboxes = document.querySelectorAll(
    '#filter-form input[type="checkbox"]:checked',
  );
  let values = [];
  checkboxes.forEach((checkbox) => {
    values.push(checkbox.value);
  });
  return values;
}

function filterArtworks() {
  // Get the checked values
  const checkedValues = getCheckedValues();

  // Get all the boxes
  const boxes = document.querySelectorAll(".box");

  // If no checkbox is checked, show all boxes and return
  if (checkedValues.length === 0) {
    boxes.forEach((box) => {
      box.style.display = "block";
    });
    return;
  }

  // For each box, check if its artwork type title is in the checked values
  boxes.forEach((box) => {
    const artworkTypeTitle = box.querySelector("p:last-child").textContent;

    if (checkedValues.includes(artworkTypeTitle)) {
      // If the artwork type title is in the checked values, display the box
      box.style.display = "block";
    } else {
      // If the artwork type title is not in the checked values, hide the box
      box.style.display = "none";
    }
  });
}

document
  .querySelector("#filter-form")
  .addEventListener("change", filterArtworks);
