import useKey from "./hooks/useKey/useKey";

function App() {
  useKey("keydown", "f", () => {
    alert("f key down");
  });

  useKey("keyup", "q", () => {
    alert("q key up");
  });

  return <>f와 q를 눌러보세요</>;
}

export default App;
