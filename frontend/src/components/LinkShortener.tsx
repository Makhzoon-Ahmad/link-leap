// import { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import InputComponent from "./InputComponent";
import logo from "../assets/logo.png";

const LinkShortener = () => {


  return (
    <div>
      <img src={logo} alt="" className="w-[500px] m-auto" />
      <InputComponent />
      <ButtonComponent>Get Link!</ButtonComponent>
    </div>
  );
};

export default LinkShortener;
