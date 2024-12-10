
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomCartPage from './pages/CustomCartPage';
import AsyncPropagationsPage from './pages/AsyncPropagationsPage';


function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path ="/" element={<CustomCartPage />} ></Route>
          <Route path ="/props" element={<AsyncPropagationsPage />} ></Route>

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App
