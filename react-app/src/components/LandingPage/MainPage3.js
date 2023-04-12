import image3 from './Assets/image3.jpeg'
import SignupFormPage from '../SignupFormPage';
const MainPage3 = () => {
     const myStyle = {
       backgroundImage: `url(${image3})`,
       height: "100vh",
       width: "100%",
       backgroundSize: "cover",
       backgroundRepeat: "no-repeat",
     };
   return (
     <div className="main-page3-container" style={myStyle}>
       {/* <img className="page3-image" src={image3} alt="scenic-pic-3" /> */}
<SignupFormPage/>
     </div>
   );
};

export default MainPage3;
