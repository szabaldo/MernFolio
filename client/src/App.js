import React, { createContext, useState, useEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Sambar from './Sambar.js';
import MainPage from './MainPage.js';
import Modal from './Modal.js';

const UserContext = createContext();
const ModalContext = createContext({ modalList: [], setModalList: () => { } });

function App() {
  const [user, setUser] = useState(null);
  const [modalList, setModalList] = useState([]);
  const [modalElements, setModalElements] = useState([]);

  useEffect(() => {
    const len = modalList.length;  
    const m = modalList.map((modal) => {
      return (
          <Modal 
            key={len} 
            inner={modal.inner} 
            width={modal.width}
            left={modal.left}
            right={modal.right}
            animStart={modal.animStart}
            animEnd={modal.animEnd}
          />
      );  
    });
    setModalElements(m);
  }, [modalList])

  useEffect(() => {
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
    <UserContext.Provider value={{ user, setUser }} className="min-width">
      <ModalContext.Provider value={{ modalList, setModalList }} >
        <Sambar />
        <MainPage />
        {modalElements}
      </ModalContext.Provider>
    </UserContext.Provider>
  );
}

export { UserContext, ModalContext };
export default App;