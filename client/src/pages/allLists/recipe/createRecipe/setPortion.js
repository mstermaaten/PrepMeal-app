import React, { useState } from "react";
import Slider from "react-input-slider";

function Portion(props) {
  const { addHandler, item, toggleHandler } = props;
  const [portion, setPortion] = useState(1);

  return (
    <div className="portion-container">
      <h1>Set Your Portion</h1>

      <div>{"Portion: " + Math.round(portion * 100) + " gr"}</div>
      <Slider
        axis="x"
        xstep={0.1}
        xmin={0.1}
        xmax={10}
        x={portion}
        onChange={({ x }) => setPortion(parseFloat(x.toFixed(2)))}
      />

      <div className="ingredient-item">
        <p className="name">{item.name}</p>
        <p className="value">
          <span>{(item.protein * portion).toFixed(2)}</span>gr
        </p>
        <p className="value">
          <span>{(item.kcal * portion).toFixed(2)}</span>kcal
        </p>
        <p className="value">
          <span>{(item.carbs * portion).toFixed(2)}</span>gr
        </p>
        <p className="value">
          <span>{(item.fats * portion).toFixed(2)}</span>gr
        </p>
      </div>
      <div>
        <p onClick={() => toggleHandler()}>Close</p>
        <p onClick={() => addHandler({ ...item, portion })}>Add Items</p>
      </div>
    </div>
  );
}

export default Portion;
