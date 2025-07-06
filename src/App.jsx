import "./App.css";
import React from "react";
import Logo from "./components/Logo";
import Title from "./components/Title";
import Form from "./components/Form";
import Converter from "./components/Converter";
import Icon from "./components/Icon"


function App() {
  
  return (
    <div className="App">
      <Logo />
      <div className="App-main">
        <Title title={"Pace Calculator"} />
        <Form />
        <Title title={"Pace Converter"} />
        <Converter />
        <Icon />
      </div>
    </div>
  );
}

export default App;
