import { useEffect, useState } from "react";
import AppRouter from "./components/Router";

function App() {
  const [init, setInit] = useState(false);
  useEffect(()=>{
    setInit(true);
  },[]);
  return (
    <>
    {init?(
      <AppRouter/>      
    ):(
      <div>
        로딩화면 ...
      </div>
    )}
    </>
  );
}

export default App;
