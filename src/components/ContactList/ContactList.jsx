import { useSelector } from 'react-redux';
import { selectVisibleContacts } from 'redux/contacts/selectors';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import css from './ContactList.module.css';

export const ContactList = () => {

  const visibleContacts = useSelector(selectVisibleContacts);

  return (
    <ul className={css['contact-list']}>
        {visibleContacts.map((contact) => {
        const {name, number, id} = contact;
        return (

          <ContactListItem
            key={id}
            id={id}
            name={name}
            number={number}
          />
      )}
      )}
    </ul>
  )
}