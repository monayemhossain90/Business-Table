import FullScreenLoader from "./components/masterLayout/FullScreenLoader";
import ProductListPage from "./pages/ProductListPage";
import {Fragment} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return (
    <Fragment>
        <BrowserRouter>
            <Routes>
               <Route exact path="/" element={<ProductListPage/>}></Route>
            </Routes>
        </BrowserRouter>
        <FullScreenLoader/>
    </Fragment>
  );
}

export default App;
