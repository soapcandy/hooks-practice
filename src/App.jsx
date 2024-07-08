import useSessionStorage from "./hooks/useSessionStorage/useSessionStorage";

function App() {
  const [status, setStatus] = useSessionStorage("status", "404 NOT FOUND");

  return (
    <div>
      <button onClick={() => setStatus("200 OK")}>Resend</button>
      {status}
    </div>
  );
}

export default App;
