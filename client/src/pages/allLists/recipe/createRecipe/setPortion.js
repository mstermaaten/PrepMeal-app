import React, { useState } from "react";
import Slider from "react-input-slider";

function Portion(props) {
  const { addHandler, item, toggleHandler } = props;
  const [portion, setPortion] = useState(1);

  return (
    <div className="portion-container">
      <h1>Set Your Portion:</h1>

      <div className="name-portion">
        <span className="name">{item.name}</span>
        <div className="portion">
          <p>Portion:</p>
          <span>{Math.round(portion * 100)}</span>
          <p>gr</p>
        </div>
      </div>
      <Slider
        axis="x"
        xstep={0.1}
        xmin={0.1}
        xmax={10}
        x={portion}
        onChange={({ x }) => setPortion(parseFloat(x.toFixed(2)))}
        style={{ width: "70%", margin: "5px 0px" }}
      />

      <div className="values-wrapper">
        <div className="nutrients-wrapper">
          <div className="value kcal">
            <img alt="" src={require("../../../../components/icons/fire.png")} />
            <span>{(item.kcal * portion).toFixed(0)}</span>kcal
          </div>
          <div className="value protein">
            <img alt="" src={require("../../../../components/icons/muscle.png")} />
            <span>{(item.protein * portion).toFixed(2)}</span>gr
          </div>
          <div className="value sugar">
            <img alt="" src={require("../../../../components/icons/sweet.png")} />
            <span>{(item.carbs * portion).toFixed(2)}</span>gr
          </div>
          <div className="value oil">
            <img alt="" src={require("../../../../components/icons/oil.png")} />
            <span>{(item.fats * portion).toFixed(2)}</span>gr
          </div>
        </div>
      </div>
      <div className="portion-buttons">
        <img
          src={require("../../../../components/icons/remove.png")}
          onClick={() => toggleHandler()}
        />
        <img
          src={require("../../../../components/icons/plus.png")}
          onClick={() => addHandler({ ...item, portion })}
        />
      </div>
    </div>
  );
}

export default Portion;
