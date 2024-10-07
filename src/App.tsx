import './App.css'
import ArenaWithBull from './components/ArenaWithBull'
import { Matador } from './components/Matador/Matador'
import ApplauseButton from "./components/Matador/ApplauseButton";

function App() {
  return (
    <div className="App">
      <ArenaWithBull
        matador={<Matador />} />
        <ApplauseButton />
    </div>
  )
}

export default App
