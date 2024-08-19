
const getPostUrl = (posterPath) =>{
     return `https://media.themoviedb.org/t/p/w220_and_h330_face/${posterPath}`
}

const SearchCard = ({id, poster_path, title, overview, release_date, onDetailsClick, onAddClick}) =>{

     return(
          <div class="card p-2 m-2">
               <img class="card-img-top" src={getPostUrl(poster_path)} alt={title}/>
               <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <p class="card-text">{overview}</p>
               </div>
               <ul class="list-group list-group-flush">
                    <li class="list-group-item">{release_date}</li>
               </ul>
               <div className="card-body">
                <button className="btn btn-outline-primary m-1" onClick={() => onDetailsClick(id)}>Details</button>
                <button className="btn btn-outline-success m-1" onClick={() => onAddClick(id)}>Add</button>
            </div>
          </div>
     )
}

export default SearchCard