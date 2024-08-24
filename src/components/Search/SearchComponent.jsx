import { useEffect, useState } from "react"
import { retrieveMovieCredits, retrieveMovieDetails, retrieveMovieSearchApi } from "../API/TmdbApiService"

import ISO6391 from 'iso-639-1';
import SearchCard from "./SearchCard";

import './SearchComponent.css';
import { useAuth } from "../Security/AuthContext";
import { createMovieApi } from "../API/MovieApiService";

import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function SearchComponent(){

    const [query, setQuery] = useState('')
    const [prevQuery, setPrevQuery] = useState('');
    const [language, setLanguage] = useState('');
    const [primaryReleaseYear, setPrimaryReleaseYear] = useState('');
    const [page, setPage] = useState(1);
    const [region, setRegion] = useState('');
    const [year, setYear] = useState('');

    const [movies, setMovies] = useState([]);

    const authContext = useAuth()
    const username = authContext.username

    const countries = require("i18n-iso-countries");
    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

    function scrollToTop() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
    }

     useEffect(() => {
      if (query && query.trim()) {
        handleSearch();
      }
    }, [page])

    const successToast = (note) => toast.success(note, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce
    })

    const errorToast = (note) => toast.error(note, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce
    })

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

     const handleDetailsClick = async (movieId) => {
        //get movie details (TmdbAPIService)
     }

    const handleAddClick = async (movieId) => {
      try{
          //get movie credits for director 
          const movieCredits = await retrieveMovieCredits(movieId);
          // console.log(movieCredits)
          const director = movieCredits.crew.find(crewMember => crewMember.job === 'Director')?.name || 
                            movieCredits.crew.find(crewMember => crewMember.job === 'Writer')?.name || 
                            'Unknown';
          // console.log(director)

          //get movie details (title, year, country)
          const movieDetails = await retrieveMovieDetails(movieId)
          // console.log(movieDetails)
          const title = movieDetails.title
          const year = parseInt((movieDetails.release_date).split("-")[0],10); 
          const country = (movieDetails.origin_country).map(code => countries.getName(code, "en")).toString()
  
          //create new movie
          const movie = {
            id: -1,
            username: username,
            title: title,
            year: year,
            director: director,
            country: country,
            rating: 0,
            watched: false
          }
          // console.log(movie)

          createMovieApi(username, movie)
          .then(response => {
            // console.log(response)
            successToast(`'${movie.title}' added to your watchlist`);
          })
          .catch(error => {
            // console.log(error)
            errorToast(`Failed to add '${movie.title}' to your watchlist`);
          })

        } catch  (e){
          console.error('Error adding movie to list: ', e)
        }

     }
     
     return (
        <div>
          <ToastContainer/>
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
              <div className="filter language-filter">
                  <p className="filter-title ">Language</p>
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
              <div className="filter release-filter">
                  <p className="filter-title ">Release Year</p>
                  <input
                      className="filter-input"
                      type="text"
                      value={primaryReleaseYear}
                      onChange={(e) => setPrimaryReleaseYear(e.target.value)}
                      placeholder="0000"
                  />
              </div>
              <div className="filter year-filter">
                  <p className="filter-title ">Year</p>
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

          {/* Search result cards */}
          <div className="search-results rounded">
              {movies.map((movie, id) => {
                  return <SearchCard key={id} {...movie} onAddClick={() => handleAddClick(movie.id)} />
              })}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button 
              disabled={page === 1} 
              onClick={() => {
                if (query) {
                  setPage(page - 1);
                  scrollToTop(); //not functioning
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
                  scrollToTop();
                }
              }}>
                  Next
            </button>
          </div>

      </div>
  
        );
}
