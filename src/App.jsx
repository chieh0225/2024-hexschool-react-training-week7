import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";

import { useState } from "react";

// 樣式檔案（CSS/SCSS）
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/week7.scss";

function App() {
  const [isAuth, setIsAuth] = useState(false); // 使用者未登入時用 false 狀態、渲染登入頁面，登入成功後改成 true、渲染產品頁面

  return (
    <>
      {isAuth ? (
        <ProductPage setIsAuth={setIsAuth} />
      ) : (
        <LoginPage setIsAuth={setIsAuth} />
      )}
    </>
  );
}

export default App;
