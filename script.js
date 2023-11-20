// const fetchData = async () => {
//   const res = await fetch("https://api.artic.edu/api/v1/artworks");
//   const data = await res.json();
//   const iiifUrl = data.config.iiif_url; // Get the base IIIF Image API endpoint

//   data.data.forEach((artwork) => {
//     if (artwork.image_id) {
//       // Check if image_id is available
//       const imageUrl = `${iiifUrl}/${artwork.image_id}/full/843,1000/0/default.jpg`; // Construct the image URL
//       document.querySelector("body").innerHTML += `<div class="box">
//             <img src="${imageUrl}">
//                     <h1>${artwork.title}</h1>
//                     <p>${artwork.dimensions}</p>
//             </div>`;
//     }
//   });

//   console.log(data);
// };

// fetchData();

const fetchData = async () => {
  const res = await fetch("https://api.artic.edu/api/v1/artworks");
  const data = await res.json();
  const iiifUrl = data.config.iiif_url; // Get the base IIIF Image API endpoint

  data.data.forEach((artwork) => {
    if (artwork.image_id) {
      // Check if image_id is available
      const imageUrl = `${iiifUrl}/${artwork.image_id}/full/843,1000/0/default.jpg`; // Construct the image URL
      fetch(imageUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.blob();
        })
        .then((blob) => {
          let objectURL = URL.createObjectURL(blob);
          document.querySelector(
            "#artwork-container",
          ).innerHTML += `<div class="box">
                  <img src="${objectURL}">
                          <h1>${artwork.title}</h1>
                          <p>${artwork.dimensions}</p>
                  </div>`;
        })
        .catch((e) =>
          console.log(
            "There has been a problem with your fetch operation: " + e.message,
          ),
        );
    }
  });

  console.log(data);
};

fetchData();
