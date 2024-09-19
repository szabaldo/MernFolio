import React, { createContext, useState, useEffect } from 'react'; 
import Sambar from './Sambar.js';
import MainPage from './MainPage.js';

const UserContext = createContext(); 

function App() {
  const [user, setUser] = useState(null);

  useEffect( () => { 
    async function getUserSession() {
      const response = await fetch(process.env.ORIGIN + "/user", {
        method: "GET"
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