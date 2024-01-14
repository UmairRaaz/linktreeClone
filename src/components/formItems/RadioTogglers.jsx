import React from "react";

const RadioTogglers = ({ options, defaultValue, onChange }) => {
  return (
    <div className="radio-togglers shadow">
      {options.map((option, index) => (
        <label key={index}>
          <input
            defaultChecked={defaultValue === option.value}
            onClick={ev => onChange(ev.target.value)}
            type="radio"
            name="bgType"
            value={option.value}
          />
          <div>
            {option.icon}
            <span>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default RadioTogglers;
