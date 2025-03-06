import React, { useState } from "react";
import FormAuth from "../components/FormAuth";
import ToggleAuth from "../components/ToggleAuth";

const PageAuth = () => {
  const [isSign, setIsSign] = useState(false);

  const handleToggle = () => {
    setIsSign(!isSign);
  };

  return (
    <div className={`container ${isSign ? "active" : ""}`}>
      <FormAuth isSign={true} />
      <FormAuth isSign={false} />
      <ToggleAuth isSign={isSign} handleToggle={handleToggle} />
    </div>
  );
};

export default PageAuth;
