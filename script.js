// Get api key from unsplash
const apiKey = "Wq0ZFgDYBX1JqQQGQ9yulfOFlOCgAqduZt9bJARzeR4"

// Create some variables to select html tags
const formEl = document.querySelector("form")
const inputEl = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more")

// Input data to be searched
let inputData = "";
// Page No
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    // Creating a dynamic url
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results

    // if(page === 1){
    //     searchResults.innerHTML = "";
    // }

    results.map((result) => {
        const imageWrapper = document.createElement("div");//creating html elements
        imageWrapper.classList.add("results");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);//putting a child
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;

    if(page>1){
        showMore.style.display = "block"; // Display the show more button
    }
}

formEl.addEventListener("submit", (event)=>{
    event.preventDefault(); // Preventing the form to submit normally
    page = 1;
    searchResults.innerHTML = ""; // Empty the search-results div before desplaying the results
    searchImages();
})

showMore.addEventListener("click", ()=>{
    searchImages();
})