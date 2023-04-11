import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { actionClearPin, getPinDetail } from "../../store/pin";

const Pin = () => {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pins.singlePin);
  console.log('pin inside component', pin)
  const author = pin.User;
  console.log('author', author);
  const authorUsername = author["username"];
  console.log('authorusername', authorUsername)

  useEffect(() => {
    dispatch(getPinDetail(pinId));
    // return () => dispatch(actionClearPin());
  }, [dispatch, pinId]);

  return (
    <div>
      <div className="leftSide">
        <img src={pin.url} alt="pin.url" />
      </div>
      <div className="rightSide">
        <button>Save</button>
        <h2>{pin.name}</h2>
        <p>{pin.description}</p>
        <div>
          <h4>{pin.User.username}</h4>
          <button>Follow</button>
        </div>
      </div>
    </div>
  );
};

export default Pin;
