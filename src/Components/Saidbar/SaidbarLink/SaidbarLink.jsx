import React from "react";
import { NavLink } from "react-router-dom";
import useDarkModeStore from "../../../Store/DarcModeStore";

export default function SaidbarLink({ text, icon, href }) {
  const { darkMode } = useDarkModeStore();

  return (
    <li>
      <NavLink className={darkMode ? "saidbar_link" : "saidbar_link_dark"} to={href}>
        <span className="saidbar_icon">{icon}</span>
        <p className="saidbar_text">{text}</p>
      </NavLink>
    </li>
  );
}

