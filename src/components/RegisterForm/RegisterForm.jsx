import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { register } from "redux/auth/operations";
import { ClearIcon } from 'helpers/icons';
import greetingImg from "../../images/hello.jpg";
import css from './RegisterForm.module.css';


export const RegisterForm = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleChange = (e) => {
      const {name: inputName, value} = e.currentTarget;

      switch (inputName) {
          case 'name':
              setUsername(value);
              break;
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

    dispatch(
      register({
        name: username,
        email,
        password
      })
    );
      
    reset();
  }

  const reset = () => {
      setUsername('');
      setEmail('');
      setPassword('');
  }

  const usernameInputId = nanoid();
  const emailInputId = nanoid();
  const passwordInputId = nanoid();

  return (
    <div className={css.wrapper}>

      <div className={css.heading}>
          <img src={greetingImg} className={css.img} alt="hello" width={170}/>
          <h1>Create new account</h1>
      </div>

      <form 
      className={css['register-form']} 
      autoComplete="off" 
      onSubmit={handleSubmit}
      >

      <label 
      htmlFor={usernameInputId}
      >
        Name
      <input
        type="text"
        name="name"
        id={usernameInputId}
        onChange={handleChange}
        value={username}
        />
      </label>

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
      <button type="submit">Register</button>
      <button type="button" 
          onClick={reset}
          disabled={!username && !email && !password}
          className={!username && !email && !password ? css.disabled : undefined}
          >
          Clear
          <ClearIcon size={24} onClick={reset}/>
      </button>
      </div>

      </form>
    </div>
  )
}