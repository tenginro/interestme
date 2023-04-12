import MainPage1 from "./MainPage1";
import MainPage2 from "./MainPage2";
import MainPage3 from "./MainPage3";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main_page-container">
      {/* <div className="page2-image"></div> */}
      <div>
        <MainPage1 src={`./Assets/image1.jpeg`} layout={"fill"} />
      </div>
      <div>
        <MainPage2 />
      </div>
      <div>
        <MainPage3 />
      </div>
    </div>
  );
};

export default MainPage;
