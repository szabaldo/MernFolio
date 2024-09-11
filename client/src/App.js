import React, { createContext, useState, useEffect } from 'react'; 
import Sambar from './Sambar';
import MainPage from './MainPage';

const UserContext = createContext(); 

function App() {
  const [user, setUser] = useState(null);

  useEffect( () => { 
    async function getUserSession() {
      const response = await fetch("http://localhost:8080/user", {
        method: "GET",
        headers: {"Content-Type": "application/json"}, 
        credentials: "include"
      });
      const res = await response.json();
      console.log(""); 
      console.log("User session Received: "); 
      console.log(res);
      if (res.user) setUser(res.user);
    };

    getUserSession(); 
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}} className="min-width">
      <Sambar />
      <MainPage />
    </UserContext.Provider>
  );
}

export { UserContext }; 
export default App;