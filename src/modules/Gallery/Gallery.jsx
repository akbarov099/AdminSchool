import React from "react";
import useDarkModeStore from "../../Store/DarcModeStore";
import User from "../../assets/images/user.jpg"

export default function Gallery() {
  const { darkMode } = useDarkModeStore();

  return (
    <section>
      <div className="container">
        <div
          className={`${
            darkMode ? "photo__wrapper-light" : "photo__wrapper-dark"
          }`}
        >
          <form>
            <button>Добавить </button>
            <div className="phot__form__wrtapper">
              <div className="phot__form__img">
                <img src={User} alt="phot" />
                <h4>Добавить фото</h4>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
