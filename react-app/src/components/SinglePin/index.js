import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { actionClearPin, getPinDetail } from "../../store/pin";
import * as sessionAction from "../../store/session";

const Pin = () => {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pins.singlePin);
  const [follow, setFollow] = useState(false);
  console.log('singlePin', pin)
  const user = useSelector((state) => state.session.user);
  const checkFollow = () => {
    const pinAuthorId = pin.user_id
    const following = user.following;
    following?.forEach((f)=> {
      if(f.id === pinAuthorId) setFollow(true)
    })
  }

  useEffect(() => {
    dispatch(getPinDetail(pinId));
    checkFollow()
    return () => dispatch(actionClearPin());
  }, [dispatch, pinId]);
  console.log('singlePin', pin.User)

  if(!pin.User) return  <div>Loading</div>

  return (
    <div>
      <div className="leftSide">
        <img src={pin.url} alt="pin.url" />
      </div>
      <div className="rightSide">
        <button
        onClick={async (e) => {
          e.preventDefault();
        }}
        >Save</button>
        <h2>{pin.name}</h2>
        <p>{pin.description}</p>
        <div>
          <h4>{pin.User.username}</h4>  
          {/* bugs coming from here.... singlePin state got cleared up */}
          {follow ? (
            <button
            onClick = {async(e)=>{
              e.preventDefault();
              await dispatch(
                sessionAction.removeFollowThunk(user, pin.User.id)
              )
              setFollow(true)
            }}
            >Following</button>
          ) : 
          (
            <button
            onClick = {async(e)=>{
              e.preventDefault();
              await dispatch(
                sessionAction.addFollowThunk(user, pin.User.id)
              )
              setFollow(false)
            }}
            >Follow</button>
          )
           }
        </div>
      </div>
    </div>
  );
};

export default Pin;
