// const fetchData = async () => {
//   // Generate a random page number between 1 and 100
//   const page = Math.floor(Math.random() * 1000) + 1;

//   const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
//   const data = await res.json();
//   const iiifUrl = data.config.iiif_url;

//   try {
//     data.data.forEach((artwork) => {
//       const imageUrl = `${iiifUrl}/${artwork.image_id}/full/843,1000/0/default.jpg`;
//       document.querySelector("body").innerHTML += `
//       <section class="hero">
//       <img src="${imageUrl}"></section>`;
//       document.querySelector(
//         "#artwork-container",
//       ).innerHTML += `<div class="box">
//             <img src="${imageUrl}">
//                 <h2>${artwork.title}</h2>
//                 <p>${artwork.dimensions}</p>
//                 <p>${artwork.artwork_type_title}</p>
//                 <p>${artwork.style_title}</p>
//             </div>`;
//     });
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// fetchData();

// document.querySelector("#random-artwork").addEventListener("click", fetchData);

// const fetchData = async () => {
//   // Generate a random page number between 1 and 100
//   const page = Math.floor(Math.random() * 1000) + 1;

//   const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
//   const data = await res.json();
//   const iiifUrl = data.config.iiif_url;

//   // Clear the body or another container element
//   document.querySelector("#artwork-container").innerHTML = "";

//   data.data.forEach((artwork) => {
//     const imageUrl = `${iiifUrl}/${artwork.image_id}/full/843,1000/0/default.jpg`;

//     // Create a new element for each artwork
//     const artworkElement = document.createElement("div");
//     artworkElement.innerHTML = `
//     <section class="hero">
//     <img src="${imageUrl}"></section>
//     <div class="box">
//           <img src="${imageUrl}">
//               <h2>${artwork.title}</h2>
//               <p>${artwork.dimensions}</p>
//               <p>${artwork.artwork_type_title}</p>
//               <p>${artwork.style_title}</p>
//     </div>`;

//     // Append the new element to the body or another container element
//     document.querySelector("#artwork-container").appendChild(artworkElement);
//   });
// };

// fetchData();

// document.querySelector("#random-artwork").addEventListener("click", fetchData);

const fetchData = async () => {
  try {
    // Generate a random page number between 1 and 100
    const page = Math.floor(Math.random() * 1000) + 1;

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
