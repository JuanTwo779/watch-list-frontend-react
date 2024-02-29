import { useEffect, useState } from "react"
import { retrieveMovieSearchApi } from "../API/TmdbApiService"

import ISO6391 from 'iso-639-1';
import SearchCard from "./SearchCard";

export default function SearchComponent(){

     const[query, setQuery] = useState('')
     const [prevQuery, setPrevQuery] = useState('');
     const [language, setLanguage] = useState('');
     const [primaryReleaseYear, setPrimaryReleaseYear] = useState('');
     const [page, setPage] = useState(1);
     const [region, setRegion] = useState('');
     const [year, setYear] = useState('');

     const [movies, setMovies] = useState([]);

     useEffect(() => {
      if (query && query.trim()) {
        handleSearch();
      }
    }, [page])

     const handleSearch = async () => {
      if(!query.trim()) {
        alert('Please enter keywords before searching.')
        return
      } else {
        setPrevQuery(query)
        if (query !== prevQuery){
          setPage(1)
        }
        try{
          const response = await retrieveMovieSearchApi(query, language, primaryReleaseYear, page, region, year)
          setMovies(response.results)
        } catch (e){
          throw e
        } 
      }
     }
     
     return (
        <div>
          <h1>Movie Search</h1>
          {/* Filters */}
          <div className="filter-container">
              <div className="filter">
                  <p className="filter-title">Keywords</p>
                  <input
                      className="filter-input"
                      type="text"
                      value={query}
                      onChange={
                        (e) => setQuery(e.target.value)
                      }
                      placeholder="E.g. godfather, part"
                  />
              </div>
              <div className="filter">
                  <p className="filter-title">Language</p>
                  <select
                    className="filter-input"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="">Select Language</option>
                    {ISO6391.getAllCodes().map((code) =>(
                      <option key={code} value={code}>
                        {ISO6391.getName(code)}
                      </option>
                    ))}
                  </select>
              </div>
              <div className="filter">
                  <p className="filter-title">Release Year</p>
                  <input
                      className="filter-input"
                      type="text"
                      value={primaryReleaseYear}
                      onChange={(e) => setPrimaryReleaseYear(e.target.value)}
                      placeholder="0000"
                  />
              </div>
              <div className="filter">
                  <p className="filter-title">Year</p>
                  <input
                      className="filter-input"
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="0000"
                  />
              </div>
          </div>

          {/* Search button */}
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>

          {/* Pagination */}
          <div className="pagination">
            <button 
              disabled={page === 1} 
              onClick={() => {
                if (query) {
                  setPage(page - 1);
                }
              }}>
                Previous
            </button>

            <span>{page}</span>

            <button 
              disabled={movies.length < 20}
              onClick={() => {
                if (query) {
                  setPage(page + 1);
                }
              }}>
                  Next
            </button>
          </div>

      
          {/* Search result cards */}
          <div className="search-results rounded">
              {movies.map((movie, id) => {
                  return <SearchCard key={id} {...movie} />
              })}
          </div>


      </div>
  
        );
}
