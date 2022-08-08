//Components
import Nav from 'components/Nav';
import AppRoutes from 'config/AppRoutes';
import { ContextFavsProvider } from 'context/ContextFavs';


//Style
import "./css/app.css";
import "./css/bootstrap.min.css";




function App() {  

  return(
    <>
    
      <Nav />
      <div className='container'>
      <ContextFavsProvider>
      <AppRoutes />
      </ContextFavsProvider>
    </div>
    </>
  );
}

export default App;
