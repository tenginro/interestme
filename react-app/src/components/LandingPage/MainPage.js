import MainPage1 from "./MainPage1";
import MainPage2 from "./MainPage2";
import MainPage3 from "./MainPage3";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main_page-container">
      <div>
      </div>
      <div className="page2-image"></div>
      <MainPage1 src={`./Assets/image1.jpeg`} layout={'fill'}/>
      <MainPage2 />

        <MainPage3 />

    </div>
  );
};

export default MainPage;
