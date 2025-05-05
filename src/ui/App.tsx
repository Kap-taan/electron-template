import { useEffect } from 'react'
import './App.css'

function App() {

  useEffect(() => {
    window.electron.subscribeStatistics((stats) => console.log(stats));
  }, [])

  return (
    <div>Hello World 2</div>
  )
}

export default App
