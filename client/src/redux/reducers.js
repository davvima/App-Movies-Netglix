const favMovies = localStorage.getItem("favs");  
let tempMovies  
   
if(favMovies === null){
 tempMovies =[];
} else{
 tempMovies = JSON.parse(favMovies);
} 


let initialState = {
    contentList: {movie:[],
    tv:[]},
    trailers:[],
    favorites:tempMovies,
    details:{}
  };
  console.log('initial state',initialState.favorites)

  const reducers = (state=initialState,action)=>{
     switch (action.type) {
        case 'GET_MOVIES':
          return {...state,
          contentList:{
            ...state.contentList,
            [action.payload.category]: action.payload.content
          }}

        case 'GET_TRAILER':
           return {
            ...state,
            trailers:[...state.trailers,action.payload]
           }

        case 'GET_DETAILS':
          return{
            ...state,
            details:action.payload
          }

        case 'ADD_FAVORITE':
            return {...state,
            favorites:[...state.favorites,action.payload]}
  
        case 'REMOVE_FAVORITE':
            return {...state,
            favorites:state.favorites.filter(e=>e.id !== action.payload)}
           
        default: return state;
        }
    }
    
export default reducers