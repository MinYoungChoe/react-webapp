import "./App.css";
import React from "react";
import Logo from "./components/Logo";
import Title from "./components/Title";
import Form from "./components/Form";
import Converter from "./components/Converter";

function App() {
  
  return (
    <div className="App">
      <Logo />
      <div className="App-main">
        <Title title={"Pace Calculator"} />
        <Form />
        <Title title={"Pace Converter"} />
        <Converter />
      </div>
    </div>
  );
}

export default App;
