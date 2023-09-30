import React from "react";

const PrivateRoutes = (props) => {
  const { VerifyEmail } = props;
  const isRegister = JSON.parse(localStorage.getItem("registration"));

  return <>{isRegister["isRegisterSuccess"] && <VerifyEmail />}</>;
};

export default PrivateRoutes;
