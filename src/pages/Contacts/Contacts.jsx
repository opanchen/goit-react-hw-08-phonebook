import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "redux/contacts/operations";
import { selectError, selectIsLoading } from "redux/contacts/selectors";
import { ContactForm, ContactList, Error, Filter, Loader } from "components"
import { Helmet } from "react-helmet"
import css from './Contacts.module.css';


const Contacts = () => {

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  

  useEffect(() => {

    dispatch(fetchContacts());
    
  }, [dispatch]);

    return (
        <>
            <Helmet>
                <title>Your contacts</title>
            </Helmet>

          <div className={css.wrapper}>
            <h1 className="visually-hidden">Phonebook</h1>   
            <div className={css.inner}>
              <h2>Add new contact</h2>   
              <ContactForm />
            </div>

            <div className={css.inner}>
              <h2>Contacts</h2>
                <Filter />

                {error && <Error message={error}/>}
                {isLoading && !error && <Loader />}

                <ContactList />
            </div>
          </div>
        </>
    )
}

export default Contacts;