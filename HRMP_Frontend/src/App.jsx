
import {Login} from "./pages/Login.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard} from "./pages/Dashboard.jsx";
import {ProtectedRoute} from "./components/ProtectedRoute.jsx";
import {UpdatePage} from "./pages/UpdatePage.jsx";
import {Request} from "./pages/Request.jsx";
import {Employees} from "./pages/Employees.jsx";



function App() {


  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>


            <Route path="/dashboard" element={<ProtectedRoute children={<Dashboard/>}/>} />
            <Route path="/update" element={<UpdatePage/>} />
            <Route path="/requests" element={<Request/>} />
            <Route path="/employee" element={<Employees/>} />



        </Routes>

      </BrowserRouter>

  )
}

export default App
