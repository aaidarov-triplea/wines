import { Route, Routes } from "react-router-dom";
import RedWine from "../RedWine/RedWine";
import RedWines from "../RedWines/RedWines";

const Layout = () => {
  return (
    <>
    <Routes>
        <Route path="/reds" element={ <RedWines /> } />
        <Route path={`/reds/:id`} element={<RedWine /> } />
    </Routes>      
    </>
  )
}

export default Layout;
