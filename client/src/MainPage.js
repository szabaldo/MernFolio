import React from 'react';
import { Outlet } from 'react-router-dom'; 

function MainPage({ id }) {
    // const isIntro = useContext(IntroContext);

    // const isIntro = useRef(true); 
    
    // useEffect( () => {
    //     setTimeout(() => {
    //         isIntro.current = false; 
    //     }, 500);
    // });

    return (
        <div id={id} className="position-relative">
            {/* <Outlet context={isIntro} /> */}
            <Outlet />
        </div>
    );
}

export default MainPage;