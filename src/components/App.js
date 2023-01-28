import React, {useEffect, useState} from "react";
import AppRouter from "./Router";
import {authService} from "../fBase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
        if (user) {
            setUserObj(user.multiFactor.user);
        }
        setInit(true);
    });
  }, []);

  return (
      <>
          {
              init ? (
                  <AppRouter
                      isLoggedIn={Boolean(userObj)}
                      userObj={userObj}
                  />
                  ) : (
                    "Initializing..."
                  )
          }
          <footer>&copy;  {new Date().getFullYear()} Nwitter</footer>
      </>
  );
}

export default App;
