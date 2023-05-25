import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { editContact } from 'redux/contacts/operations';
import { selectContacts } from "redux/contacts/selectors";
import { ClearIcon } from 'helpers/icons';
import css from './EditContactForm.module.css';
import PropTypes from 'prop-types';

export const EditContactForm = ({id, prevName, prevNumber, closeModal, avatar}) => {

    const [name, setName] = useState(prevName);
    const [number, setNumber] = useState(prevNumber);


    const dispatch = useDispatch();
    
    const contacs = useSelector(selectContacts); 


    const nameInputId = nanoid();
    const numberInputId = nanoid();

    const checkContactName = (query) => {
        return contacs
        .filter((item) => item.id !== id)
        .some(({name}) => name.toLowerCase() === query.toLowerCase())
    }

   const handleChange = (e) => {
        const {name: inputName, value} = e.currentTarget;

        switch (inputName) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                console.log(`Error: there isn't ${name} input for value ${value}. Check form markup.`);
            return
        }
    }

   const handleSubmit = (e) => {
        e.preventDefault();
        
        if (checkContactName(name)) {
            toast.error(`${name} is already in contacts.`)
            return
        } // we leave to user an opportunity to change name without default reset

        dispatch(editContact({id, name, number}))
          
        reset();
        closeModal();
    }

    const reset = () => {
        setName('');
        setNumber('');
    }

    return(
        <div className={css.wrapper}>
            <img src={avatar} className={css.avatar} alt="contact's avatar" width={80}/>
            <form className={css['contact-form']} autoComplete="off" onSubmit={handleSubmit}>
                <p className={css['form-title']}>Edit contact:</p>
            <label htmlFor={nameInputId}>
            Name
            <input
            type="text"
            name="name"
            id={nameInputId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
            value={name}
            />
            </label>
    
            <label htmlFor={numberInputId}>
            Number
            <input
            type="tel"
            name="number"
            id={numberInputId}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            value={number}
            />
            </label>

            <div className={css['buttons-bar']}>
            <button type="submit">Save</button>
            <button type="button" 
                onClick={reset}
                disabled={!name && !number}
                className={!name && !number ? css.disabled : undefined}
                >
                Clear
                <ClearIcon size={24}/>
            </button>
            </div>

            </form>
        </div>
    )
}

EditContactForm.propTypes = {
    id: PropTypes.string.isRequired,
    prevName: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    avatar: PropTypes.string.isRequired,
}