import SignupFormModal from "../SignupFormModal";
import image3 from "./Assets/mainpage3.jpeg";

const MainPage3 = () => {
  const myStyle = {
    backgroundImage: `url(${image3})`,
    height: "100vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  };
  return (
    <div className="main-page3-container" style={myStyle}>
      <div
        style={{
          fontSize: "70px",
          fontWeight: "600",
          marginLeft: "30px",
        }}
      >
        <h2 style={{ color: "white" }}>Sign up to get your ideas</h2>
      </div>
      <div className="signupPartInLanding">
        <SignupFormModal />
      </div>
    </div>
  );
};

export default MainPage3;
