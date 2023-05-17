export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <img
        src="https://design.netcorecloud.com/wp-content/uploads/2020/09/infinity-loader.gif"
        alt="loading"
        style={{ width: "600px", height: "300px"}}
      ></img>
      <h2>Loading...</h2>
    </div>
  );
}
