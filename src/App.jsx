import useTimeout from "./hooks/useTimeOut/useTimeOut";

function App() {
  const clear = useTimeout(() => {
    alert("launch");
  }, 3000);

  return (
    <>
      <div>useTimeOut 테스트</div>
      <button onClick={clear}>정지</button>
    </>
  );
}

export default App;
