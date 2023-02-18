import React from "react";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

/*인증 여부에 따라 달라질 부분 구현*/
export default function AppRouter ({refreshUser, isLoggedIn, userObj})  {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Switch>
                {isLoggedIn ? (
                <div style={{
                      maxWidth: 890,
                      width: "100%",
                      margin: "0 auto",
                      marginTop: 80,
                      display: "flex",
                      justifyContent: "center",
                }}>
                    <Route exact path="/">
                        <Home userObj={userObj}/>
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj={userObj} refreshUser={refreshUser}/>
                    </Route>
                    <Redirect to="/" from="*"/>
                </div>
                )    :    (
                    <>
                        <Route exact path="/">
                            <Auth/>
                        </Route>
                        <Redirect to="/" from="*"/>
                    </>
                )}
            </Switch>
        </Router>
    );
}