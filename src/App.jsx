import { useState } from "react";
import useResize from "./hooks/useResize/useResize";

function App() {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const ref = useResize((rect) => {
    setImageSize({ width: rect.width, height: rect.height });
  });

  return (
    <div
      ref={ref}
      style={{ width: "100px", height: "100px", backgroundColor: "blue" }}
    >
      <div
        width={imageSize.width}
        height={imageSize.height}
        src="https://picsum.photos/1000"
        mode="contain"
      ></div>
    </div>
  );
}

export default App;
