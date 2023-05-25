import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks/useAuth';
import { logOut } from 'redux/auth/operations';
import { LogOutIcon } from 'helpers/icons';
import css from './UserMenu.module.css';

export const UserMenu = () => {

    const dispatch = useDispatch();
    const { user } = useAuth();

    const handleLogOut = () => {
        dispatch(logOut());
    }

    return (
        <div className={css.wrapper}>
            <p className={css.username}>{user.email}</p>
            <button className={css['btn-logout']} type="button" onClick={handleLogOut}>
                <span className={css['btn-label']}>Logout</span>
                <LogOutIcon size={24}/>
            </button>
        </div>
    )
}