// VARIABLES
const watchlistMoviesContainer = document.getElementById("watchlist-container")
let newArray = JSON.parse(localStorage.getItem("myWatchlist")) 

document.addEventListener("click", removeFromWatchlist)

initialRender()

function initialRender(){
    if(newArray.length > 0){
        renderFilms(newArray, watchlistMoviesContainer)
        document.getElementById("no-movies-watchlist-container").style.display = "none"
    }else{
        document.getElementById("no-movies-watchlist-container").style.display = "block"
    }
}

// FUNCTION THAT REMOVES FILMS USING FILTER METHOD TO DELET ELEMENTS FROM LOCAL STORAGE AND THEN REWRITE THE LOCAL STORAGE
function removeFromWatchlist(e){
    if(e.target.dataset.watchlistid){
        newArray = newArray.filter(id => id != e.target.dataset.watchlistid)
        localStorage.setItem("myWatchlist",JSON.stringify(newArray))
        let changedArray = jsonParse()
        renderFilms(changedArray, watchlistMoviesContainer)
        if(newArray.length === 0){
            watchlistMoviesContainer.innerHTML = ''
            initialRender()
        }
    }
}

function jsonParse(){
    return JSON.parse(localStorage.getItem("myWatchlist"))
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
                                        <button class="watchlist-button" data-watchlistid="${filmId}"> <i class="fa-solid fa-circle-minus"></i> Remove</button>
                                    </div>
                                    <p class="description-text">${Plot}</p>
                                </div>
                            </div>
                            <hr>`  
                    targetObject.innerHTML = moviesHtml
            })   
        }
}
