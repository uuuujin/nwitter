import React, {useState} from "react";
import  {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

/*인증 여부에 따라 달라질 부분 구현*/
export default function AppRouter ({isLoggedIn})  {
    return (
        <Router>
            <Switch>
                {isLoggedIn ? (
                <>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                </>
                )    :    (
                <Route exact path="/">
                    <Auth/>
                </Route>
                )}
            </Switch>
        </Router>
    );
}

/*
    <></>
    Fragment가 무엇이냐면, 많은 요소들을 render하고 싶을때 사용함.
    그렇다고 div는 넣기 싫고 span도 넣기 싫고 할때 씀.

* */