import { useDispatch } from 'react-redux';
import css from './UserMenu.module.css';
import { useAuth } from 'hooks/useAuth';
import { logOut } from 'redux/auth/operations';
import { LogOutIcon } from 'helpers/icons';

export const UserMenu = () => {

    const dispatch = useDispatch();
    const { user } = useAuth();

    const handleLogOut = () => {
        dispatch(logOut());
    }

    return (
        <div className={css.wrapper}>
            <p className={css.username}>Welcome, {user.name}!</p>
            <button className={css['btn-logout']} type="button" onClick={handleLogOut}>
                <span className={css['btn-label']}>Logout</span>
                <LogOutIcon size={24}/>
            </button>
        </div>
    )
}