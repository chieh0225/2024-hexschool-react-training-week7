import axios from "axios";

import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function LoginPage({ getProducts, setIsAuth }) {
  const [account, setAccount] = useState({
    username: "example@test.com",
    password: "example",
  });

  const handleInputChange = (e) => {
    // console.log(e.target.value);
    // console.log(e.target.name); // 可以用於辨別目前是哪一個 input 正在輸入內容

    const { value, name } = e.target;

    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault(); // 取消 form 表單的預設行為
    // console.log(account);
    // console.log(import.meta.env.VITE_BASE_URL);
    // console.log(import.meta.env.VITE_API_PATH);
    axios
      .post(`${BASE_URL}/v2/admin/signin`, account)
      .then((res) => {
        // console.log(res);
        const { token, expired } = res.data;
        // console.log(token, expired);
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;

        axios.defaults.headers.common["Authorization"] = token;

        setIsAuth(true);
      })
      .catch((err) => {
        console.error(err);
        alert("登入失敗");
      });
  };

  // const checkUserLogin = () => {
  //   axios
  //     .post(`${BASE_URL}/v2/api/user/check`)
  //     .then((res) => {
  //       getProducts();
  //       setIsAuth(true);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // useEffect(() => {
  //   const token = document.cookie.replace(
  //     /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
  //     "$1"
  //   );

  //   axios.defaults.headers.common["Authorization"] = token;

  //   checkUserLogin();
  // }, []);

  return (
    <div className="container login">
      <div className="row justify-content-center">
        <h1 className="h3 mb-3">請先登入</h1>
        <div className="col-8">
          <form className="form-signin" onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="username"
                placeholder="name@example.com"
                name="username"
                value={account.username}
                onChange={handleInputChange}
                required
                autoFocus
              />
              <label htmlFor="username">信箱</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                value={account.password}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="password">密碼</label>
            </div>
            <button className="btn btn-primary">登入</button>
          </form>
        </div>
      </div>
      <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
    </div>
  );
}

export default LoginPage;
