import css from './Layout.module.css';
import { AppBar } from "components/AppBar/AppBar"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {
    return (
        <div className={css.container}>
            <AppBar />
            <main>
                <Suspense fallback={null}> 
                    <Outlet />
                </Suspense>
            </main>
            <ToastContainer autoClose={3000} />
        </div>
    )
}