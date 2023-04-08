// Api key =>
// https://api.themoviedb.org/3/search/movie?api_key=3a0c4dd223a8f1dfe67839464bdde91a&language=en-US&query=Bholaa&page=1&include_adult=false



const from = document.querySelector("form")
const moviesName = document.querySelector("input")

from.onsubmit=(e) =>{
    document.querySelector("#results").innerHTML= ""
    e.preventDefault()
    fetch("https://api.themoviedb.org/3/search/movie?api_key=3a0c4dd223a8f1dfe67839464bdde91a&language=en-US&query="+moviesName.value+"&page=1&include_adult=false")
    .then((response)=> {return response.json()})
    .then((result)=>{console.log(result)
        showMoveis(result.results)
    })
}
function showMoveis(data){

    if(data.length === 0){
        console.log("data not found")
        const notfounddiv = document.createElement("div")
        notfounddiv.setAttribute("class","dataNotfound text-center")
        const notfound = document.createElement("img")
        notfound.src = "https://www.rajasthanndaacademy.com/assets/images/no-record-found.png";
        document.querySelector("#results").append(notfounddiv)
        document.querySelector("#results").lastElementChild.append(notfound)

    }
    else{

        for(let i=0; i<data.length; i++){
            const innerdiv = document.createElement("div")
            innerdiv.setAttribute("class","innerbox col-md-3 col-12 mb-5 m-auto  shadow rounded")
           
            const image = document.createElement("img")
            image.setAttribute("class","img-fluid mt-3 rounded")
            image.src = data[i].poster_path ? "https://image.tmdb.org/t/p/original"+ data[i].poster_path: "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
           
            const title = document.createElement("h3")
            title.setAttribute("class","text-truncate mt-3")
            title.innerHTML= data[i].title
           
            const overview = document.createElement("p")
            overview.innerHTML = data[i].overview
            
            const releaseDate = document.createElement("h5")
            releaseDate.innerHTML = data[i].release_date 
           

            // fetch("https://api.themoviedb.org/3/movie/"+data.id+"/videos?api_key=3a0c4dd223a8f1dfe67839464bdde91a&&language=en-US")
           fetch("https://api.themoviedb.org/3/movie/"+data[i].id+"/videos?api_key=3a0c4dd223a8f1dfe67839464bdde91a&language=en-US")
           .then((resonse)=>{return resonse.json()})
           .then((result)=>{console.log(result)
                if(result.results.length > 0){
                    const trailerKey = trailer(result.results);
                    if (trailerKey) innerdiv.append(videoplaybtn(trailerKey));

                }
           })

            document.querySelector("#results").append(innerdiv)
            document.querySelector("#results").lastElementChild.append(image)
            document.querySelector("#results").lastElementChild.append(title)
            document.querySelector("#results").lastElementChild.append(releaseDate)
            document.querySelector("#results").lastElementChild.append(overview)
        }
    }

}

function trailer(data2){
    const videodata = data2.find(
        (obj) => obj.site === "YouTube" && obj.type === "Trailer"
    );
    if(videodata === "undefined") return false;
    else return videodata.key;
}

function videoplaybtn (key){
    const btn = document.createElement("a");
    btn.href = "https://youtube.com/embed/"+ key;
    btn.targe = "_blank";
    btn.innerHTML = "play trailer"
    return btn

}
