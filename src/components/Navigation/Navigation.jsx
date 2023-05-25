import { useAuth } from 'hooks/useAuth';
import { NavLink } from "react-router-dom"
import css from './Navigation.module.css';

const navLinkClassName = ({isActive}) => isActive ? css['link-active'] : css.link;

export const Navigation = () => {

    const { isLoggedIn } = useAuth();

    return (
        <nav className={css.nav}>
            <NavLink className={navLinkClassName} to="/">Home</NavLink>
            {isLoggedIn && (
                <NavLink className={navLinkClassName} to="/contacts">Contacts</NavLink>
            )}
        </nav>
    )
}