import axios from "axios";

import { useForm } from "react-hook-form";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function LoginPage({ setIsAuth }) {
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    const account = {
      username: watch("username"),
      password: watch("password"),
    };

    axios
      .post(`${BASE_URL}/v2/admin/signin`, account)
      .then((res) => {
        const { token, expired } = res.data;
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
        axios.defaults.headers.common["Authorization"] = token;
        setIsAuth(true);
      })
      .catch((error) => {
        alert("登入失敗");
        console.log(error);
      });
  };

  const {
    watch,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onBlur",
  });

  return (
    <div className="container login">
      <div className="row justify-content-center">
        <h1 className="h3 mb-3 text-center">請先登入</h1>
        <div className="col-8">
          <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                信箱
              </label>
              <input
                type="email"
                className={`form-control ${
                  touchedFields.username
                    ? errors.username
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="username"
                placeholder="name@example.com"
                name="username"
                {...register("username", {
                  required: "信箱欄位必填",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "信箱格式錯誤",
                  },
                })}
              />
              <div
                className="col-auto invalid-feedback"
                style={{
                  minHeight: "1.5em",
                  visibility: errors.username ? "visible" : "hidden",
                }}
              >
                {errors.username?.message || <span>&nbsp;</span>}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                密碼
              </label>
              <input
                type="password"
                className={`form-control ${
                  touchedFields.password
                    ? errors.password
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="password"
                placeholder="Password"
                name="password"
                {...register("password", {
                  required: "密碼欄位必填",
                })}
              />
              <div
                className="col-auto invalid-feedback"
                style={{
                  minHeight: "1.5em",
                  visibility: errors.password ? "visible" : "hidden",
                }}
              >
                {errors.password?.message || <span>&nbsp;</span>}
              </div>
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
