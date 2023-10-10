import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Success = (props) => {
  const { message } = props;
  return (
    <div className="mt-1">
      <p className="text-xs text-green-400 flex items-center gap-1 font-light"><CheckCircleIcon className="text-green-600" style={{fontSize:"1rem"}} />{message}</p>
    </div>
  );
};

export default Success;
