import React from "react";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

/*인증 여부에 따라 달라질 부분 구현*/
export default function AppRouter ({isLoggedIn, userObj})  {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                <>
                    <Route exact path="/">
                        <Home userObj={userObj}/>
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj={userObj}/>
                    </Route>
                    <Redirect to="/" from="*"/>
                </>
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