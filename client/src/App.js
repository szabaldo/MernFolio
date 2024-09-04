import React, { createContext, useState } from 'react'; 
import Sambar from './Sambar';
import MainPage from './MainPage';

const UserContext = createContext(); 

function App() {
  const [user, setUser] = useState(); 

  return (
    <UserContext.Provider value={{user, setUser}} className="min-width">
      <Sambar />
      <MainPage />
    </UserContext.Provider>
  );
}

export { UserContext }; 
export default App;