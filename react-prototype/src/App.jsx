
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomCartPage from './pages/CustomCartPage';
import ProductAddPage from './pages/ProductAddPage';

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path ="/" element={<CustomCartPage />} ></Route>
          <Route path ="/props" element={<ProductAddPage />} ></Route>

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App
