import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

export default function NotFound({
  clearSearchQuery,
  searchQuery,
  setSearchQuery,
}) {
  const history = useHistory();

  // useEffect(() => {
  //   clearSearchQuery();
  // }, []);

  return (
    <h2
      className="loadingAllPins"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        {/* <i className="fas fa-solid fa-spinner fa-5x"></i> */}
        <i className="fas fa-solid fa-magnifying-glass fa-5x"></i>
      </div>
      <div>
        <div>Sorry, we couldn't find any Pins for this search.</div>
        <div style={{ textAlign: "center" }}>Please return to Home page.</div>
      </div>
    </h2>
  );
}
