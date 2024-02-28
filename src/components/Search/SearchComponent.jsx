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
          <div className="filter-container">
              <div className="filter">
                  <p className="filter-title">Keywords</p>
                  <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="E.g. godfather, part"
                  />
              </div>
              <div className="filter">
                  <p className="filter-title">Language</p>
                  <input
                      type="text"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      placeholder=""
                  />
              </div>
              <div className="filter">
                  <p className="filter-title">Release Year</p>
                  <input
                      type="text"
                      value={primaryReleaseYear}
                      onChange={(e) => setPrimaryReleaseYear(e.target.value)}
                      placeholder="2000"
                  />
              </div>
              <div className="filter">
                  <p className="filter-title">Page</p>
                  <input
                      type="number"
                      value={page}
                      onChange={(e) => setPage(parseInt(e.target.value))}
                      placeholder="Page"
                  />
              </div>
              <div className="filter">
                  <p className="filter-title">Country</p>
                  <input
                      type="text"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      placeholder="country code"
                  />
              </div>
              <div className="filter">
                  <p className="filter-title">Year</p>
                  <input
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="####"
                  />
              </div>
          </div>
          <button onClick={handleSearch}>Search</button>
      
          <div className="search-results rounded">
              {movies.map((movie, id) => {
                  return <SearchCard key={id} {...movie} />
              })}
      
          </div>
      </div>
  
        );
}
