import React, {useState} from "react";
import {authService} from "../fBase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");


  const onChange = (event) => {
      const {
          target: {name, value}
      } = event;
      if (name === "email") {
          setEmail(value)
      } else if ( name === "password") {
          setPassword(value);
      }
  };

  const onSubmit = async (event) => {
      event.preventDefault();
      try {
          let data;
          if (newAccount) {
              //새 계정 생성
              data = await authService.createUserWithEmailAndPassword(
                  email, password
              );
          } else {
              //로그인으로 연결
                data = await authService.signInWithEmailAndPassword(
                    email, password
                );
          }
      } catch (error) {
          setError(error.message);
      }
  };


    const toggleAccount = () => setNewAccount(prev => !prev);
    return (
        <>
            <form onSubmit={onSubmit}>
              <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={onChange}
              />
              <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={onChange}
              />
              <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
              {error}
          </form>
          <span onClick={toggleAccount}>
              {newAccount ? "Sign in" : "Create Account"}
          </span>
        </>
    )
}

export default AuthForm;