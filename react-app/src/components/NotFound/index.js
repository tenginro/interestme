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
        <i className="fas fa-solid fa-spinner fa-5x"></i>
      </div>
      <div>
        <div>We're adding new ideas to your home feed!</div>
        <div style={{ textAlign: "center" }}>
          Please return to{" "}
          <span style={{ textDecoration: "underline" }}>
            <NavLink exact to="/pins" onClick={clearSearchQuery}>
              HomePage
            </NavLink>
          </span>
          .
        </div>
      </div>
    </h2>
  );
}
