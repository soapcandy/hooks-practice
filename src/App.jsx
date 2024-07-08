import useKeyPress from "./hooks/useKey/usekeyPress";

function App() {
  const pressed = useKeyPress("?");

  return <>{pressed ? "아이린 조 아" : "물음표를 눌러보세요"}</>;
}

export default App;
