import { useState } from 'react'
import MyComponent from './page/ShopCart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <MyComponent />

    </>
  )
}

export default App
