import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";

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
import MainPage from "./components/LandingPage/MainPage";
import ProfilePage from "./components/ProfilePage";
import OtherUserProfile from "./components/OtherUserProfile";
import Footer from "./components/Footer";
import SearchPins from "./components/SearchPins";
import NotFound from "./components/NotFound";

function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation
        isLoaded={isLoaded}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/user">
            <ProfilePage />
          </Route>
          <Route exact path="/users/:userId">
            <OtherUserProfile />
          </Route>
          <Route exact path="/pins">
            <AllPins
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </Route>
          <Route exact path="/pins/search/:searchInput">
            <SearchPins
              clearSearchQuery={() => setSearchQuery("")}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
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
          <Route exact path="/boards/new">
            <CreateBoard />
          </Route>
          <Route exact path="/boards/:boardId">
            <BoardDetails />
          </Route>
          <Route exact path="/boards/edit">
            <EditBoard />
          </Route>
          <Route>
            <NotFound
              clearSearchQuery={() => setSearchQuery("")}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
