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
      <div className="linked_info_div">
        <div className="inner-div-linked_info">
          <div>Danielle Lei</div>
          <a href="https://github.com/daniellelei">
            <i className="fa-brands fa-github fa-3x"></i>
          </a>
          <a href="https://www.linkedin.com/in/danielle-lei/">
            <i className="fa-brands fa-linkedin fa-3x"></i>
          </a>
        </div>
        <div className="inner-div-linked_info">
          <div style={{ textAlign: "center" }}>Guillermo Hernandez-Lopez</div>
          <a href="https://github.com/ghernandez0044">
            <i className="fa-brands fa-github fa-3x"></i>
          </a>
          <a href="https://www.linkedin.com/in/guillermo-hernandez-32a307180/">
            <i className="fa-brands fa-linkedin fa-3x"></i>
          </a>
        </div>
        <div className="inner-div-linked_info">
          <div>Khai Bui</div>
          <a href="https://github.com/khaib22127">
            <i className="fa-brands fa-github fa-3x"></i>
          </a>
          <a href="https://www.linkedin.com/in/khai-bui-60614b26b/">
            <i className="fa-brands fa-linkedin fa-3x"></i>
          </a>
        </div>
        <div className="inner-div-linked_info">
          <div>Tengzhong Luo</div>
          <a href="https://github.com/tenginro">
            <i className="fa-brands fa-github fa-3x"></i>
          </a>
          <a href="https://www.linkedin.com/in/luotengzhong/">
            <i className="fa-brands fa-linkedin fa-3x"></i>
          </a>
        </div>
      </div>
      {/* <img className="page2-image" src={image2} alt="scenic-pic-2" /> */}
    </div>
  );
};

export default MainPage2;
