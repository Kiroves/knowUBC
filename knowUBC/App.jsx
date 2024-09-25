import React, {useState} from 'react'
import Notifications from './app/Notifications'
import Home from './app/Home'

const App = () => {
  const [comp, setComp] = useState("Home")
  if (comp === "Home") {
    return <Home setComp={setComp} />
  } else if (comp == "Notifications") {
    return <Notifications setComp={setComp}/>
  }
}

export default App