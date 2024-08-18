import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";
import { createAwardForMovieApi, retrieveAwardForMovieApi, updateAwardForMovieApi } from "../API/AwardApiService";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function AwardComponent() {
     
     const {id} = useParams()
     const {awardId} = useParams()
     const [organisation, setOrganisation] = useState('')
     const [year, setYear] = useState('')
     const [description, setDescription] = useState('')

     const authContext = useAuth()
     const username = authContext.username

     const navigate = useNavigate()
     const pathBack = `/movie/${id}/awards`

     useEffect(
          () => retrieveAward,[awardId]
     )

     function retrieveAward() {
          if(awardId != -1) {
               retrieveAwardForMovieApi(username, id, awardId)
               .then(response => {
                    // console.log(response.data)
                    setOrganisation(response.data.organisation)
                    setYear(response.data.year)
                    setDescription(response.data.description)
               })
               .catch(error => console.log(error))
          }
     }

     function submit(values){
          const award = {
               awardId: awardId,
               year: values.year,
               organisation: values.organisation,
               description: values.description
          }

          if(awardId == -1){
               createAwardForMovieApi(username, id, award)
               .then(response => {
                    navigate(pathBack)
               })
               .catch(error => console.log(error))
          } else {
               updateAwardForMovieApi(username, id, awardId, award)
               .then(response => {
                    navigate(pathBack)
               })
               .catch(error => console.log(error))
          }
     }

     function validate(values){
          let errors ={}

          if(values.organisation.length < 5) {
               errors.organisation = "Enter at least 5 characters"
          }

          if(values.year < 1800 || values.year > 2099) {
               errors.year = "Enter a valid year"
          }

          if(values.description.length < 5) {
               errors.description = "Enter at least 5 characters"
          }

          return errors
     }

     const generateYears = () => {
          const years = [];
          var currentYear = new Date().getFullYear()
          for (let i = currentYear; i >= 1800; i--) {
               years.push(i);
          }
          return years;
     };

     return (
          <div className="container">
               <h1>Enter Award Details</h1>
               <div>
                    <Formik initialValues={{organisation, year, description}}
                         enableReinitialize={true}
                         onSubmit={submit}
                         validate={validate}
                         validateOnChange={false}
                         validateOnBlur={false}
                    >
                    {
                         ({values}) => (
                              <Form>
                                   {/* Organisation */}
                                   <fieldset className="form-group">
                                        <label>Organisation</label>
                                        <Field type='text' className='form-control' name='organisation'/>
                                   </fieldset>
                                   <ErrorMessage 
                                        name="organisation"
                                        component="div"
                                        className="alert alert-danger"/>
                                   {/* YEAR */}
                                   <fieldset className="form-group">
                                        <label>Year</label>
                                        <Field as="select" name="year" className="form-control">
                                             <option value=""></option>
                                             {generateYears().map(year => (
                                                  <option key={year} value={year}>{year}</option>
                                             ))}
                                        </Field>
                                   </fieldset>
                                   <ErrorMessage 
                                        name="year"
                                        component="div"
                                        className="alert alert-danger"
                                   />
                                   {/* Description */}
                                   <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field type='text' className='form-control' name='description'/>
                                   </fieldset>
                                   <ErrorMessage 
                                        name="description"
                                        component="div"
                                        className="alert alert-danger"/>

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