export default function RatingInfoComponent(){
     return (
          <div className="container">
               <h1 className="m-4">Ratings Information</h1>
               <table className="table text-start table-bordered">
                    <thead>
                         <tr className="table-info">
                              <th>#</th>
                              <th>Critic</th>
                         </tr>
                    </thead>
                    <tbody>
                         <tr>
                              <th className="table-success">1</th>
                              <th>Rotten Tomatoes</th>
                         </tr>
                         <tr>
                              <th className="table-warning">2</th>
                              <th>MyAnimeList</th>
                         </tr>
                         <tr>
                              <th className="table-danger">3</th>
                              <th>IMDB</th>
                         </tr>
                    </tbody>
               </table>
          </div>
     )
}