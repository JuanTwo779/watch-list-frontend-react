import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../Security/AuthContext"
import { createMovieApi, retrieveMovieApi, updateMovieApi } from "../API/MovieApiService"
import { ErrorMessage, Formik, Form, Field } from "formik"

export default function MovieComponent() {

     const {id} = useParams()

     const[title, setTitle] = useState('')
     const[year, setYear] = useState('')
     const[director, setDirector] = useState('')
     const[country, setCountry] = useState('')
     const[rating, setRating] = useState('')
     const[watched, setWatched] = useState(false)

     const authContext = useAuth()
     const username = authContext.username

     const navigate = useNavigate()

     useEffect(
          () => retrieveMovie,[id]
     )

     function retrieveMovie() {
          if(id != -1) {
               retrieveMovieApi(username, id)
               .then(response => {
                    console.log(response)
                    setTitle(response.data.title)
                    setYear(response.data.year)
                    setDirector(response.data.director)
                    setCountry(response.data.country)
                    setRating(response.data.rating)
                    setWatched(response.data.watched)
               })
               .catch(error => console.log(error))
          }
     }

     function submit(values){
          // console.log(values)
          const movie = {
               id: id,
               username: username,
               title: values.title,
               year: values.year,
               director: values.director,
               country: values.country,
               rating: values.rating,
               watched: values.watched
          }

          if(id == -1) {
               createMovieApi(username, movie)
               .then(response => {
                    navigate('/movies')
               })
               .catch(error => console.log(error))
          } else {
               updateMovieApi(username, id, movie)
               .then(response => {
                    navigate('/movies')
               })
               .catch(error => console.log(error))
          }

     }

     function validate(values) {
          let errors = {}

          if(values.title.length < 2) {
               errors.title = "Enter at least 2 characters"
          }

          if(values.year < 1800 || values.year > 2099) {
               errors.year = "Enter a valid year"
          }
          
          if(values.director.length < 5) {
               errors.director = "Enter at least 5 characters"
          }

          if(values.country.length < 2) {
               errors.country = "Enter at least 2 characters"
          }

          if(values.rating < 0 || values.rating > 100) {
               errors.rating = "Enter a rating between 0-100"
          }
          
          return errors
     }


     return (
          <div className="container">
               <h1>Enter Movie Details</h1>
               <div>
                    <Formik initialValues={{title, year, director, country, rating, watched}}
                         enableReinitialize={true}
                         onSubmit={submit}
                         validate={validate}
                         validateOnChange={false}
                         validateOnBlur={false}
                    >
                    {
                         ({values, setFieldValue}) => (
                              <Form>
                                   {/* TITLE */}
                                   <fieldset className="form-group">
                                        <label>Title</label>
                                        <Field type='text' className='form-control' name='title'/>
                                   </fieldset>
                                   <ErrorMessage
                                        name="title"
                                        component="div"
                                        className="alert alert-danger"
                                   />
                                   {/* YEAR */}
                                   <fieldset className="form-group">
                                        <label>Year</label>
                                        <Field type='number' className='form-control' name='year'/>
                                   </fieldset>
                                   <ErrorMessage 
                                        name="year"
                                        component="div"
                                        className="alert alert-danger"
                                   />
                                   {/* DIRECTOR */}
                                   <fieldset className="form-group">
                                        <label>Director</label>
                                        <Field type='text' className='form-control' name='director'/>
                                   </fieldset>
                                   <ErrorMessage 
                                        name="director"
                                        component="div"
                                        className="alert alert-danger"
                                   />
                                   {/* COUNTRY */}
                                   <fieldset className="form-group">
                                        <label>Country</label>
                                        <Field type='text' className='form-control' name='country'/>
                                   </fieldset>
                                   <ErrorMessage 
                                        name="country"
                                        component="div"
                                        className="alert alert-danger"
                                   />
                                   {/* RATING */}
                                   <fieldset className="form-group">
                                        <label>Rating</label>
                                        <Field type='number' className='form-control' name='rating'/>
                                   </fieldset>
                                   <ErrorMessage 
                                        name="rating"
                                        component="div"
                                        className="alert alert-danger"
                                   />
                                   {/* WATCHED */}
                                   <fieldset className="form-group">
                                        
                                        <label className="form-check-label" htmlFor="watched">
                                             Watched
                                        </label>
                                        <Field
                                             type="checkbox"
                                             name="watched"
                                             checked={values.watched}
                                             onChange={() => setFieldValue('watched', !values.watched)}
                                        />
                                   </fieldset>
                                   
                                   <div>
                                        <button className="btn btn-primary m-5" type="submit">Save</button>
                                   </div>
                              </Form>
                         )
                    }

                    </Formik>
               </div>
          </div>
     )
}