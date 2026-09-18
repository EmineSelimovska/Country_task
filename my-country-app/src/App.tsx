import { BrowserRouter, Route, Routes } from "react-router-dom"
import CountryList from "./components/CountryList"

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<CountryList/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
