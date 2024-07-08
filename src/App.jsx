import { useState } from "react";
import useHotKey from "./hooks/useHotKey/useHotKey";

function App() {
  const [value, setValue] = useState("");

  const hotkeys = [
    {
      global: true, // 전역으로 작동하는것?
      combo: "meta",
      onKeyDown: (e) => {
        alert("meta");
      },
    },
    {
      global: true,
      combo: "alt+w",
      onKeyDown: (e) => {
        alert("alt+w");
      },
    },
    {
      global: true,
      combo: "ctrl+shift+k",
      onKeyDown: (e) => {
        alert("ctrl+shift+k");
      },
    },
    {
      combo: "esc",
      onKeyDown: (e) => {
        setValue("");
      },
    },
  ];

  const { handleKeyDown } = useHotKey(hotkeys); // hotkeys값을 받아서 useHotKey 동작

  return (
    <>
      <h1>useHotKey 테스트</h1>
      <h2>1. meta</h2>
      <h2>2. alt + w</h2>
      <h2>3. ctrl + shift + k</h2>

      <h1>로컬 테스트</h1>
      <h2>esc를 눌러 입력창 지우기</h2>
      <input
        onKeyDown={handleKeyDown} // 키보드가 눌리면 handleKeyDown 작동
        value={value}
        onChange={(e) => setValue(e.target.value)} // value값에 입력된 값 적용
      />
    </>
  );
}

export default App;
