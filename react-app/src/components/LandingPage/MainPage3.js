import SignupFormModal from "../SignupFormModal";
import image3 from "./Assets/mainpage3.jpeg";
// import SignupFormPage from '../SignupFormPage';
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
      <div className="signupPartInLanding">
        <SignupFormModal />
      </div>
    </div>
  );
};

export default MainPage3;
