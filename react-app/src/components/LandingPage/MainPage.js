import MainPage1 from "./MainPage1";
import MainPage2 from "./MainPage2";
import MainPage3 from "./MainPage3";
import { Scrollbar } from "smooth-scrollbar-react";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main_page-container">
      <h1>HELLO FROM MAIN PAGE</h1>

      <MainPage1 />
      <MainPage2 />
      <MainPage3 />
    </div>
  );
};

export default MainPage;
