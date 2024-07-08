import useLocalStorage from "./hooks/useLocalStorage/useLocalStorage";

function App() {
  const [status, setStatus] = useLocalStorage("status", "404 NOT FOUND");

  return (
    <div>
      <button onClick={() => setStatus("200 OK")}>Resend</button>
      {status}
    </div>
  );
}

export default App;
