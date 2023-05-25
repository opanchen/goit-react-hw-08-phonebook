import css from './Home.module.css';
import heroImg from '../../images/app_img.jpg';

const Home = () => {

    return (
    <div className={css.container}>
        <h1>Welcome to Phonebook Application!</h1>
        <img src={heroImg} className={css['hero-img']} alt="application desktop" width={400} />
    </div>
    )
}

export default Home;