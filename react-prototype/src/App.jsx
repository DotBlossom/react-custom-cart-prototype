
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomCartPage from './pages/CustomCartPage';


function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path ="/" element={<CustomCartPage />} ></Route>


        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App
