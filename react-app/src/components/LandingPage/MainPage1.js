import image1 from './Assets/image1.jpeg'
const MainPage1 = () => {
    const myStyle = {
      backgroundImage: `url(${image1})`,
      height: "100vh",
      width: "100%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };
  return (
    <div className="main-page1-container" style={myStyle}>

      {/* <img className="page1-image" src={image1} alt="scenic-pic-1" /> */}
    </div>
  );
};

export default MainPage1;
