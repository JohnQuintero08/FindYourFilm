// VARIABLES DECLARATION
let watchlist = []
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-button")
const allMoviesContainer = document.getElementById("all-movies-container")
const myWatchlistBtn = document.getElementById("myWatchlist-button")
const notAddedContainer = document.getElementById("not-added-to-watchlist-container")
const addedContainer = document.getElementById("added-to-watchlist-container")
 
// localStorage.clear()

// BUTTONS

searchBtn.addEventListener("click", searchHandleClick)
document.addEventListener("click", addToWatchlist)


// HANDLE CLICK ON +WATCHLIST BUTTON
function addToWatchlist(e){
    if(e.target.dataset.watchlistid){
        if(watchlist.includes(e.target.dataset.watchlistid)){
            notAddedContainer.style.display = "block"
            setTimeout(function(){
                notAddedContainer.style.display = "none"
            },1000)
        }else{
            addedContainer.style.display = "block"
            watchlist.push(e.target.dataset.watchlistid)
            localStorage.setItem("myWatchlist",JSON.stringify(watchlist))
            setTimeout(function(){
                addedContainer.style.display = "none"
            },1000)
        }
    }
}

// FUNCTION FOR FECTH AND SHOW FILMS WHEN SEARCH BUTTON IS CLICKED
function searchHandleClick(){
    document.getElementById("no-data-image-container").style.display = "none"
    allMoviesContainer.innerHTML = ' '
    dataFilms()
}

// FUNCTION FOR BRING THE ID'S OF SEARCHED FILMS
function dataFilms(){
    fetch(`https://www.omdbapi.com/?apikey=e371614c&s=${searchInput.value}&plot=full`)
        .then(res => res.json())
        .then(data => {
            let arrayOfFilmsId = data.Search.map(function(film){
                return film.imdbID
            })
            renderFilms(arrayOfFilmsId, allMoviesContainer)          
        })
}

// FUNCTION FOR RENDER THE FILMS 
function renderFilms(arrayData, targetObject){
    let moviesHtml = ""
    for (let filmId of arrayData){
        fetch(`https://www.omdbapi.com/?apikey=e371614c&i=${filmId}&plot=short`)
            .then(res => res.json())
            .then(data => {
                const {Title, Poster, Plot, Ratings, Runtime, Genre} = data
                moviesHtml += `
                        <div class="movie-container">
                                <img class="film-poster" src="${Poster}" alt="${Title}"/>
                                <div class="description-container">
                                    <div class="name-container">
                                        <h3 class="name-text">${Title}</h3>
                                        <p class="star-text"> ⭐</p>
                                    </div>
                                    <div class="class-container">
                                        <p class="time-text">${Runtime}</p>
                                        <p class="genre-text">${Genre}</p>
                                        <button class="watchlist-button" data-watchlistid="${filmId}"> <i class="fa-solid fa-circle-plus"></i> Watchlist</button>
                                    </div>
                                    <p class="description-text">${Plot}</p>
                                </div>
                            </div>
                            <hr>`  
                    targetObject.innerHTML = moviesHtml
            })   
        }
}

