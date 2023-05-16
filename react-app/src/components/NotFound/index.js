import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

export default function NotFound({
  clearSearchQuery,
  searchQuery,
  setSearchQuery,
}) {
  const history = useHistory();

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
      <div>
        <i className="fas fa-solid fa-spinner fa-5x"></i>
      </div>
      <div>
        <div>We're adding new ideas to your home feed!</div>
        <div style={{ textAlign: "center" }}>
          Please return to{" "}
          <span
            style={{ textDecoration: "underline" }}
            onClick={clearSearchQuery}
          >
            <NavLink to="/pins">HomePage</NavLink>
          </span>
          .
        </div>
      </div>
    </h2>
  );
}
