import { useState } from "react";
import useClickAway from "./hooks/useClickAway/useClickAway";

function App() {
  const [show, setShow] = useState(false);
  const ref = useClickAway((e) => {
    if (e.target.tagName !== "BUTTON") setShow(false);
  });

  return (
    <div>
      <button onClick={() => setShow(true)}>Show</button>
      <div
        ref={ref}
        style={{
          display: show ? "block" : "none",
          width: "200px",
          height: "200px",
          border: "2px solid black",
          backgroundColor: "#eee",
        }}
      >
        박스 바깥을 눌러봐요!
      </div>
    </div>
  );
}

export default App;
