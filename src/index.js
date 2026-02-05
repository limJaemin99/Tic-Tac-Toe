import { StrictMode } from "react"; //React
import { createRoot } from "react-dom/client";  //React의 웹 브라우저와의 통신 라이브러리 (React DOM)
import "./styles.css";  //CSS

import App from "./App";    //App 컴포넌트 불러오기

//React 18버전부터 createRoot 사용
const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);