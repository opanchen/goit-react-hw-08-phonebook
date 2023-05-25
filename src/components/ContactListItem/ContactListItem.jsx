import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';
import { Modal } from 'components/Modal/Modal';
import { EditContactForm } from 'components/EditContactForm/EditContactForm';
import { EditIcon, DeleteIcon } from 'helpers/icons';
import { fakeImgAPI } from 'helpers/fakeImgAPI';
import css from './ContactListItem.module.css';
import PropTypes from 'prop-types';


export const ContactListItem = ({id, name, number}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    const handleDeleteContact = (id) => {
        dispatch(deleteContact(id));
    }

    const toggleModal = () => {
        setIsModalOpen((prevModalState) => !prevModalState)
    }

    const imgPath = fakeImgAPI.getImgById(id);

    return (
        <li className={css['contact-item']} >
            <img src={imgPath} className={css.avatar} alt="random animal" width={48}/>
            <p className={css['contact-text']}>
            <span className={css['contact-name']}>{name}:</span> {number}
            </p>
            <div className={css['buttons-bar']}>
                <button type="button" className={css['edit-btn']} onClick={toggleModal}>
                   <span className={css['btn-label']}>Edit</span>
                    <EditIcon size={24} className={css['icon-edit']}/>
                </button>
                <button className={css['delete-btn']}
                type="button" 
                onClick={() => handleDeleteContact(id)}
                >
                    <span className={css['btn-label']}>Delete</span>
                    <DeleteIcon size={24} className={css['icon-del']}/>
                </button>
            </div>

            {isModalOpen && <Modal
                onClose={toggleModal}>
                    <EditContactForm
                        id={id}
                        prevName={name}
                        prevNumber={number}
                        closeModal={toggleModal}
                        avatar={imgPath}
                    />  
            </Modal>}
        </li>

    )
}

ContactListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
}