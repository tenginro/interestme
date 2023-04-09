import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { actionClearPin, getPinDetail } from "../../store/pin";

const Pin = () => {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pins.singlePin);

  useEffect(() => {
    dispatch(getPinDetail(pinId));
    return () => dispatch(actionClearPin());
  }, [dispatch]);

  return (
    <div>
      <div>
        <img src={pin.url} />
      </div>
      <div>
        <h2>{pin.name}</h2>
        <p>{pin.description}</p>
      </div>
    </div>
  );
};

export default Pin;
