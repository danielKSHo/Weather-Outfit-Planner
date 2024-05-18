import { BrowserRouter, Routes, Route} from "react-router-dom";

//pages
import Home from './pages/Home'
import Upcoming from './pages/Upcoming'
import LearnMore from "./pages/LearnMore";
import Wardrobe from "./pages/Wardrobe";



function App() {
 

  return (
    <BrowserRouter>
    
      <Routes>
        
        <Route exact path="/" Component={Home} />
        <Route path="upcoming" Component={Upcoming}/>
        <Route path="learnmore" Component = {LearnMore}/>
        <Route path="wardrobe" Component = {Wardrobe}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;