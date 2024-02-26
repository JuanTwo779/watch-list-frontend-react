import { useEffect, useState } from "react"
import { retrieveMovieSearchApi } from "../API/TmdbApiService"

import ISO6391 from 'iso-639-1';
import SearchCard from "./SearchCard";

export default function SearchComponent(){

     const[query, setQuery] = useState('')
     const [language, setLanguage] = useState('');
     const [primaryReleaseYear, setPrimaryReleaseYear] = useState('');
     const [page, setPage] = useState(1);
     const [region, setRegion] = useState('');
     const [year, setYear] = useState('');

     const [movies, setMovies] = useState([]);
     
    //  console.log(ISO6391.getAllCodes())
    //  console.log(ISO6391.getAllNativeNames())

     useEffect(() => {
      console.log(movies)
    }, [movies])

     const handleSearch = async () => {
          try{
            const response = await retrieveMovieSearchApi(query, language, primaryReleaseYear, page, region, year)
            setMovies(response.results)
          } catch (e){
            throw e
          } 
     }
     
     return (
          <div>
            <h1>Movie Search</h1>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter movie title"
            />
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="Language"
            />
            <input
              type="text"
              value={primaryReleaseYear}
              onChange={(e) => setPrimaryReleaseYear(e.target.value)}
              placeholder="Primary Release Year"
            />
            <input
              type="number"
              value={page}
              onChange={(e) => setPage(parseInt(e.target.value))}
              placeholder="Page"
            />
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Region"
            />
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Year"
            />
            <button onClick={handleSearch}>Search</button>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {movies.map((movie, id) =>{
                return <SearchCard key={id} {...movie} />
              })}
              
            </div>


          </div>
        );
}
