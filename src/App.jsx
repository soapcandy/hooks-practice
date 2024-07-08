import useScroll from "./hooks/useScroll/useScroll";

function App() {
  const [ref, coord] = useScroll();

  return (
    <>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "red",
          overflow: "auto",
        }}
        ref={ref}
      >
        <div
          style={{
            width: "10000px",
            height: "10000px",
            backgroundImage: "linear-gradient(180deg, #000 0%, #fff 100%)",
          }}
        ></div>
      </div>
      <button
        onClick={() => {
          ref.current.scrollTo({ top: 20000, left: 20000, behavior: "smooth" });
        }}
      >
        scroll
      </button>
      {coord.x}, {coord.y}
    </>
  );
}

export default App;
