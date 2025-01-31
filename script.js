const accesKey = "QSIA0ooM2bcXGuNSv42p9cHg7NxUJzb5hc9Jes4a8Zs";

let searchForm = document.getElementById('search-form');
let searchInput = document.getElementById('search-input');
let searchResults = document.getElementById('search-results');
let showMoreBtn = document.getElementById('show-more-btn');

let keyword = '';
let page = 1;

async function searchImages() {
    keyword = searchInput.value
    const URL = `https://api.unsplash.com/search/photos?page=${keyword}&query=${keyword}&client_id=${accesKey}`;

    const response = await fetch(URL);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = ""
    }

    results.map((result) => {
        const searchResult = document.createElement('div');
        searchResult.className = 'search-result'
        const image = document.createElement('img');
        image.src = result.urls.small
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html
        imageLink.target = '_blank'
        imageLink.textContent = result.alt_description

        searchResult.appendChild(image);
        searchResult.appendChild(imageLink);
        searchResults.appendChild(searchResult);
    })

    page++

    if (page > 1) {
        showMoreBtn.style.display = "block"
    }

}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1
    searchImages();
})

showMoreBtn.addEventListener('click', (e) => {
    
    searchImages();
})
