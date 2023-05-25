import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

const setNavLinkClassName = ({isActive}) => isActive ? css['link-active'] : css.link;

export const AuthNav = () => {
    return (
        <div className={css.nav}>
            <NavLink className={setNavLinkClassName} to="/register">Register</NavLink>
            <NavLink className={setNavLinkClassName} to="/login">Log In</NavLink>

        </div>
    )
}