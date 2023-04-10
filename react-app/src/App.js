import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import AllPins from "./components/AllPins";
import SinglePin from "./components/SinglePin";
import CurrentPins from "./components/ManagePins";
import CreatePin from "./components/CreatePin";
import EditPin from "./components/EditPin";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreateBoard from "./components/CreateBoard";
import BoardGallery from "./components/BoardGallery";
import EditBoard from "./components/EditBoard";
import BoardDetails from "./components/BoardDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <AllPins />
          </Route>
          <Route exact path="/pins">
            <AllPins />
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/pins/current">
            <CurrentPins />
          </Route>
          <Route exact path="/pins/new">
            <CreatePin />
          </Route>
          <Route exact path="/pins/:pinId/edit">
            <EditPin />
          </Route>
          <Route exact path="/pins/:pinId">
            <SinglePin />
          </Route>
          <Route exact path="/boards/current">
            <BoardGallery />
          </Route>
          <Route exact path="/boards/:boardId">
            <BoardDetails />
          </Route>
          <Route exact path="/boards/new">
            <CreateBoard />
          </Route>
          <Route exact path="/boards/edit">
            <EditBoard />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
