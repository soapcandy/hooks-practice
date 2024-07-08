import useHover from "./hooks/useHover";

function App() {
  const [ref, hover] = useHover();

  return (
    <>
      <div
        style={{ width: "100px", height: "100px", backgroundColor: "red" }}
        ref={ref}
      />
      {hover ? <div>ToolTip!!</div> : null}
    </>
  );
}

export default App;
