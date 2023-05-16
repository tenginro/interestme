import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as pinsAction from "../../store/pin";
import "./CreatePin.css";
import { useModal } from "../../context/Modal";

const CreatePin = () => {
  const categories = ["Art", "Food", "Tech"];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [desCount, setDesCount] = useState(0);
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState(categories[0]);
  // const [board, setBoard] = useState("")
  const [errors, setErrors] = useState({});
  const [resErrors, setResErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const currentUser = useSelector((state) => state.session.user);
  //for errors

  useEffect(() => {
    const err = [];
    if (!name.length) err.name = "* Name is required";
    if (name.length>50) err.name = "* The max is 50 characters."
    if (!description.length) err.description = "* Description is required";
    if (description.length>255) err.description = "* Description length can only have 255 characters." 
    if (!url.length) err.url = "* Image is required";
    if (!category.length) err.category = "* Category is required";
    setErrors(err);
  }, [name, description, url, category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setResErrors({});

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("url", url);
    formData.append("category", category);
    formData.append("user_id", currentUser.id);

    // const newPin = {
    //   name,
    //   description,
    //   url,
    //   category,
    // };

    if (!Boolean(Object.values(errors).length)) {
      const createdRes = await dispatch(
        // pinsAction.createPin(newPin, currentUser)
        pinsAction.createPin(formData)
      );
      if (!createdRes.errors) {
        // history.push(`/pins`);
        closeModal();
        history.push(`/pins/${createdRes.id}`);
        await reset();
      } else {
        await setResErrors(createdRes.errors);
      }
    }
  };
  const maxCharClassNameHandle = (desCount) => {
    if (desCount>=255) return "showCharacterLength reachedMax"
    return "showCharacterLength"
  }

  const reset = () => {
    setName("");
    setDescription("");
    setCategory("");
    setUrl("");
    setErrors({});
    setResErrors({});
    setHasSubmitted(false);
  };

  return (
    <div className="create-new_pin-container">
      {/* <h1>Create a New Pin</h1> */}
      <form onSubmit={handleSubmit}>
        <ul>
          {hasSubmitted && Boolean(Object.values(resErrors).length) ? (
            <li>{Object.values(resErrors)}</li>
          ) : null}
        </ul>
        <div className="create_new-pin-form">
          <div className="left-Side">
            {/* <label>Upload an Image</label> */}
            <div className="file-image_input-field-container">
              <input
                id="file-image_input-field"
                type="text"
                placeholder=" Drag and drop an image file"
                name="url"
                onClick={() => window.alert("Feature coming soon!")}
              ></input>
            </div>

            <input
              id="create-pin-url_input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              name="url"
              style={{ minHeight: "40px" }}
            ></input>
            {hasSubmitted ? (
              <p className="error"> {errors.url}</p>
            ) : (
              <p className="noErrorDisplay">{"  "}</p>
            )}
          </div>
          <div className="right-Side">
            <div className="category-save_container">
              {/* <select
                id="select-create_pin-board"
                onChange={(e) => setBoard(e.target.value)}
                value={board}
                name="board"
                placeholder="Choose a Board"
              >
                {currentUser.boards ? (
                  currentUser.boards.map((board) => (
                    <option key={board.id}>{board.name}</option>
                  ))
                ) : (
                  <option>None</option>
                )}
              </select> */}
              <button id="save-create_btn" type="submit">
                Create
              </button>
            </div>

            <div className="add-your_title">
              <input
                id="ad-your_title-input"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Add your title"
                name="name"
              ></input>
              {hasSubmitted ? (
                <p className="error"> {errors.name}</p>
              ) : (
                <p className="noErrorDisplay">{"  "}</p>
              )}
            </div>
            <div className="userInfo">
              <img src={currentUser.profile_pic} className="profile_pic"/>
              <div>
                <p>{currentUser.first_name}{currentUser.last_name}</p>
                <p>{currentUser.followers.length} 
                {currentUser.followers.length <= 1 ? ` follower` : ` followers`}</p>
              </div>
            </div>
            <div>
              <label>Choose a category: </label>
              <select
                id="select-create_pin-category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
                name="category"
                placeholder="Choose a category"
              >
                {/* <option value=""></option> */}
                {categories.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                  // add a key prop here
                ))}
              </select>
            </div>
            <br />
            <div>
              <input
                id="description-input_"
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value)
                  setDesCount(e.target.value.length)
                }}
                value={description}
                placeholder="Tell everyone what your Pin is about             😃"
                name="description"
              ></input>
              <p className={maxCharClassNameHandle(desCount)}>{desCount} /255 characters</p>
              
              {hasSubmitted ? (
                <p className="error"> {errors.description}</p>
              ) : (
                <p className="noErrorDisplay">{"  "}</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePin;
