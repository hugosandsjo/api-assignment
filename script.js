// const fetchData = async () => {
//   const res = await fetch("https://api.artic.edu/api/v1/artworks");
//   const data = await res.json();
//   const iiifUrl = data.config.iiif_url;

//   data.data.forEach((artwork) => {
//     const imageUrl = `${iiifUrl}/${artwork.image_id}/full/843,1000/0/default.jpg`;
//     document.querySelector("body").innerHTML += `
//     <section class="hero">
//     <img src="${imageUrl}"></section>`;
//     document.querySelector("#artwork-container").innerHTML += `<div class="box">
//           <img src="${imageUrl}">
//               <h2>${artwork.title}</h2>
//               <p>${artwork.dimensions}</p>
//               <p>${artwork.artwork_type_title}</p>
//               <p>${artwork.style_title}</p>
//           </div>`;
//   });
// };

// fetchData();

const fetchData = async () => {
  // Generate a random number between 1 and 100
  const limit = Math.floor(Math.random() * 100) + 1;

  const res = await fetch(
    `https://api.artic.edu/api/v1/artworks?limit=${limit}`,
  );
  const data = await res.json();
  const iiifUrl = data.config.iiif_url;

  data.data.forEach((artwork) => {
    const imageUrl = `${iiifUrl}/${artwork.image_id}/full/843,1000/0/default.jpg`;
    document.querySelector("body").innerHTML += `
    <section class="hero">
    <img src="${imageUrl}"></section>`;
    document.querySelector("#artwork-container").innerHTML += `<div class="box">
          <img src="${imageUrl}">
              <h2>${artwork.title}</h2>
              <p>${artwork.dimensions}</p>
              <p>${artwork.artwork_type_title}</p>
              <p>${artwork.style_title}</p>
          </div>`;
  });
};

fetchData();
