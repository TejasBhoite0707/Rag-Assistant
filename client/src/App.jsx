import AppRoutes from "./routes/AppRoutes"

import { fetchCurrentUser } from "./features/auth/store/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
function App() {
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(fetchCurrentUser());
  },[dispatch])
  

  return <AppRoutes/>
}

export default App



