import React from "react";
import SaidbarLink from "./SaidbarLink/SaidbarLink";
import useDarkModeStore from "../../Store/DarcModeStore";
import useBurgerStore from "../../Store/BurgerStore";
import { PiStudentBold } from "react-icons/pi";
import { RiContactsBook2Line } from "react-icons/ri";
import { MdEvent } from "react-icons/md";
import { RiGalleryFill } from "react-icons/ri";

export default function Saidbar() {
  const { darkMode } = useDarkModeStore();
  const { isMenuOpen } = useBurgerStore();

  return (
    <div
      className={`${darkMode ? "saidbar" : "saidbar_dark"} ${
        isMenuOpen ? "saidbar_open" : ""
      }`}
    >
      <div className="logo">
        <h1>Школа №39</h1>
      </div>

      <ul className="saidbar_wrapper">
        <SaidbarLink href={"/"} icon={<PiStudentBold />} text={"Учителя"} />
        <SaidbarLink href={"/events"} icon={<MdEvent />} text={"Событя"} />
        <SaidbarLink
          href={"/gallery"}
          icon={<RiGalleryFill />}
          text={"Галарея"}
        />
        <SaidbarLink
          href={"/contact"}
          icon={<RiContactsBook2Line />}
          text={"Отзыв"}
        />
      </ul>
    </div>
  );
}
