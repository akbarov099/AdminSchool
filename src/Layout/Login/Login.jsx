import React, { useRef, useState } from "react";
import useTokenStore from "./store/useToken";
import api from "../../utils/axiosInstance";

export default function Login() {
  const elLogin = useRef();
  const elPassword = useRef();
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const { setToken } = useTokenStore();

  const handleLogin = (evt) => {
    evt.preventDefault();
    const loginValue = elLogin.current.value.trim();
    const passwordValue = elPassword.current.value.trim();

    if (!loginValue || !passwordValue) {
      setError("Введите логин и пароль.");
      return;
    }

    setError("");
    setApiError("");

    api
    .post(
      "/admin/login",
      {
        login: loginValue,
        password: passwordValue,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log("Response data:", res.data);
  
      if (res.data.accessToken) {
        setToken(res.data.accessToken); 
        setError("");
        setApiError("");
      } else {
        setApiError("Token not found in response.");
        setIsErrorModalVisible(true);
      }
    })
    .catch((error) => {
      const errorMessage =
        error.response?.data?.error?.message || "Неверный логин или пароль";
      setApiError(errorMessage);
      setIsErrorModalVisible(true);
    });
  
  };

  const handleCloseErrorModal = () => {
    setApiError("");
    setIsErrorModalVisible(false);
  };

  return (
    <section className="login">
      <div className="log">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <form className="signin" onSubmit={handleLogin}>
          <div className="content">
            <div className="form">
              <div className="inputBx">
                <input
                  type="text"
                  ref={elLogin}
                  className={error ? "error" : ""}
                  placeholder="Введите логин"
                />
                <i>Login</i>
              </div>
            </div>
            <div className="inputBx">
              <input
                type="password"
                ref={elPassword}
                className={error ? "error" : ""}
                placeholder="Введите пароль"
              />
              <i>Пароль</i>
            </div>

            {error && <p className="error-text">{error}</p>}

            <div className="inputBxx">
              <input type="submit" value="Войти" />
            </div>
          </div>
        </form>

        {apiError && <p className="error-text">{apiError}</p>}

        {isErrorModalVisible && (
          <div className="modal">
            <div className="modal-content">
              <p>{apiError}</p>
              <button onClick={handleCloseErrorModal}>Закрыть</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
