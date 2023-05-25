
import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { logIn } from "redux/auth/operations";
import { ClearIcon, LogInIcon } from "helpers/icons";
import greetingImg from "../../images/hello.jpg";
import css from './LoginForm.module.css';

export const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const {name: inputName, value} = e.currentTarget;

        switch (inputName) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                console.log(`Error: there isn't ${inputName} input for value ${value}. Check form markup.`);
            return
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(logIn({email, password}));
          
        reset();
    }

    const reset = () => {
        setEmail('');
        setPassword('');
    }

    const emailInputId = nanoid();
    const passwordInputId = nanoid();

    return (
      <div className={css.wrapper}>
        <div className={css.heading}>
          <img src={greetingImg} className={css.img} alt="hello" width={170}/>
          <h1>Log in to your account</h1>
        </div>
        <form 
          className={css['login-form']} 
          autoComplete="off" 
          onSubmit={handleSubmit}
        >
    
          <label htmlFor={emailInputId}>
            Email
          <input
            type="email"
            name="email"
            id={emailInputId}
            required
            onChange={handleChange}
            value={email}
          />
          </label>

          <label htmlFor={passwordInputId}>
            Password
          <input
            type="password"
            name="password"
            id={passwordInputId}
            required
            onChange={handleChange}
            value={password}
          />
          </label>

          <div className={css['buttons-bar']}>
          <button type="submit">
            Log In
            <LogInIcon size={24} />
            </button>
          <button type="button" 
              onClick={reset}
              disabled={!email && !password}
              className={!email && !password ? css.disabled : undefined}
              >
              Clear
              <ClearIcon size={24}/>
          </button>
            </div>
        </form>
      </div>
    )
}