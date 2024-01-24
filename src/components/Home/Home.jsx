import MainPage from '../../pages/MainPage';
import sH from '../Home/Home.module.css';
import CalculatorForm from '../CalculatorForm/CalculatorForm';
import Header from '../Header/Header';

export const Home = () => {

  return (
    <div className={sH.mainPage}>
      <Header/>
     <CalculatorForm />
    </div>
  );
};
