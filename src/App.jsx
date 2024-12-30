import { BrowserRouter,Routes,Route } from "react-router-dom"
import Body from "./Components/Body"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import appStore from "./utils/appStore.jsx"
import { Provider } from 'react-redux'
import Feed from "./Components/Feed.jsx"
import Connections from "./Components/Connections.jsx"
import Requests from "./Components/Requests.jsx"
function App() {
 
  return (
    <>

    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
      <Route path="/feed" element={<Feed/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/connections" element={<Connections/>}/>
        <Route path="/requests" element={<Requests/>}/>
        

      </Route>

    </Routes>

    </BrowserRouter>
    </Provider>
    

     
    </>
  )
}

export default App
