import React, {useEffect, useState} from "react";
import AppRouter from "./Router";
import {authService} from "../fBase";
import {updateProfile} from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
        if (user) {
            setUserObj(
                {
                    displayName : user.displayName,
                    uid : user.uid,
                    updateProfile: (args) => updateProfile(user,
{displayName : user.displayName
                    }),
                }
            );
        }
        setInit(true);
    });
  }, []);

  /*우리가 updateProfile을 사용하게 되면 firebase쪽에 있는 user를 새로 고침 해주게 되는데,
  * 우리의 header, 우리의 navigation은 firebase와 연결되어 있지 않음.
  * 그래서 firebase의 정보를 가지고 react.js를 업데이트 해야함.*/
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj(
                {
                    displayName : user.displayName,
                    uid : user.uid,
                    updateProfile: (args) => updateProfile(user,
{displayName : user.displayName
                    }),
                }
            );
  };
  /*react에게도 큰object를 판단하는건 복잡해짐. 그리고 생각보다 authService.currentUser 규모가 큼
  * */

  return (
      <>
          {
              init ? (
                  <AppRouter
                      refreshUser={refreshUser}
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
