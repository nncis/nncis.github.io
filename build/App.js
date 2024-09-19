import './index.css'
import Desktop from './components/Desktop';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
       <Route path="/" element={<Desktop />} />
      </Routes>
    </>
  );
}

export default App;
