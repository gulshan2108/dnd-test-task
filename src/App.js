import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import PlayList from "./Pages/PlayList/PlayList";

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PlayList/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App;