import React, { useState } from "react";
import Button from "./Button";

const Converter = () => {
  const initialFormData = {
    fromUnit: "minPerKm",
    toUnit: "kph",
    minutes: "",
    seconds: "",
    speed: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isConverted, setIsConverted] = useState(false);
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setResult("");
    setErrorMessage("");
    setIsConverted(false);
  };

  const handleConvert = () => {
    try {
      const { fromUnit, toUnit, minutes, seconds, speed } = formData;
      let res = "";

      if (fromUnit === "minPerKm") {
        const totalMinutes =
          parseFloat(minutes) + parseFloat(seconds || 0) / 60;
        if (isNaN(totalMinutes) || totalMinutes <= 0) {
          throw new Error("Invalid pace input. Please enter valid numbers.");
        }
        if (toUnit === "kph") {
          res = (60 / totalMinutes).toFixed(2) + " kph";
        } else if (toUnit === "mph") {
          res = ((60 / totalMinutes) * 0.621371).toFixed(2) + " mph";
        }
      } else if (fromUnit === "kph" || fromUnit === "mph") {
        const spd = parseFloat(speed);
        if (isNaN(spd) || spd <= 0) {
          throw new Error("Invalid speed input. Please enter a valid number.");
        }
        const spdInKph = fromUnit === "mph" ? spd / 0.621371 : spd;
        const minutesPerKm = 60 / spdInKph;
        const mins = Math.floor(minutesPerKm);
        const secs = Math.round((minutesPerKm - mins) * 60);
        res = `${mins}:${secs.toString().padStart(2, "0")} min/km`;
      }

      setResult(res);
      setErrorMessage("");
      setIsConverted(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const getToUnitOptions = () => {
    if (formData.fromUnit === "minPerKm") {
      return [
        { value: "kph", label: "kph" },
        { value: "mph", label: "mph" },
      ];
    } else {
      return [{ value: "minPerKm", label: "min/km" }];
    }
  };

  return (
    <div className="form">
      <form>
        <div className="calculate-box container">
          <div className="label">
            <label>From:</label>
          </div>
          <select
            value={formData.fromUnit}
            onChange={(e) => handleInputChange("fromUnit", e.target.value)}
          >
            <option value="minPerKm">min/km</option>
            <option value="kph">kph</option>
            <option value="mph">mph</option>
          </select>

          <div className="label">
            <label>To:</label>
          </div>
          <select
            value={formData.toUnit}
            onChange={(e) => handleInputChange("toUnit", e.target.value)}
          >
            {getToUnitOptions().map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>

          {formData.fromUnit === "minPerKm" ? (
            <div className="label">
              <label>Pace:</label>
              <div className="input">
                <input
                  type="number"
                  placeholder="min"
                  min={0}
                  max={59}
                  value={formData.minutes}
                  onChange={(e) => handleInputChange("minutes", e.target.value)}
                />
                &nbsp;:&nbsp;
                <input
                  type="number"
                  placeholder="sec"
                  min={0}
                  max={59}
                  value={formData.seconds}
                  onChange={(e) => handleInputChange("seconds", e.target.value)}
                />
              </div>
              &nbsp;/km&nbsp;
            </div>
          ) : (
            <div className="label">
              <label>Speed:</label>
              <input 
                className="input"
                type="number"
                placeholder={formData.fromUnit}
                value={formData.speed}
                onChange={(e) => handleInputChange("speed", e.target.value)}
              />
            </div>
          )}

          {result && <p className="result-text">{result}</p>}
        </div>
        <div className="error">{errorMessage}</div>

        <Button
          onClick={isConverted ? resetForm : handleConvert}
          text={isConverted ? "Reset" : "Convert"}
        />
      </form>
    </div>
  );
};

export default Converter;
