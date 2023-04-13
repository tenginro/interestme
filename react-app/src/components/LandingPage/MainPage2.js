import image2 from "./Assets/image2.jpeg";
const MainPage2 = () => {
  const myStyle = {
    backgroundImage: `url(${image2})`,
    height: "100vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className="main-page1-container" style={myStyle}>
      {/* <img className="page2-image" src={image2} alt="scenic-pic-2" /> */}
    </div>
  );
};

export default MainPage2;
