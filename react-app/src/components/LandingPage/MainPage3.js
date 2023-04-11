import image3 from './Assets/image3.jpeg'
import SignupFormPage from '../SignupFormPage';
const MainPage3 = () => {
   return (
     <div className="main-page3-container" style={{backgroundImage: "image3"}}>
       <img className="page3-image" src={image3} alt="scenic-pic-3" />
{/* <SignupFormPage/> */}
     </div>
   );
};

export default MainPage3;
