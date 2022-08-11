import Card from 'components/Card/Card';

import './grid.css'

const Grid = ({list, category}) => {  
    console.log(list) 

    return (
         <div className="movie-container">
             <br />
             {list.map((el)=>{           
                
                 return(
                     <div className='tarjeta col-md-4 col-xl-2 col-lg-3' key={el.id}>
                         <Card category={category?category:el.category?el.category:el.media_type}
                                title={el.title}
                                id={el.id}
                                poster_path={el.poster_path}
                                overview={el.overview}
                                backdrop_path={el.backdrop_path?el.backdrop_path:el.poster_path}
                                created={el.created}
                            />
                       </div>
                    )
               })}
          </div> 
    );
};

export default Grid;