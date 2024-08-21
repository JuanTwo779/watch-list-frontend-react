
const getPostUrl = (posterPath) =>{
     return `https://media.themoviedb.org/t/p/w220_and_h330_face/${posterPath}`
}

const SearchCard = ({poster_path, title, overview, release_date, onDetailsClick, onAddClick}) =>{

     return(
          <div className="card p-2 m-2">
               <img className="card-img-top" src={getPostUrl(poster_path)} alt={title}/>
               <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{overview}</p>
               </div>
               <ul className="list-group list-group-flush">
                    <li className="list-group-item">{release_date}</li>
               </ul>
               <div className="card-body">
                <button className="btn btn-outline-primary m-1" onClick={() => onDetailsClick()}>Details</button>
                <button className="btn btn-outline-success m-1" onClick={() => onAddClick()}>Add</button>
               </div>
          </div>
     )
}

export default SearchCard