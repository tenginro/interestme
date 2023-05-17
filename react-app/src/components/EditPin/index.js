import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useHistory, useParams } from "react-router-dom";
import * as pinsAction from "../../store/pin";
import OpenModalButton from "../OpenModalButton/index";
import DeleteModal from "../DeletePinModal";
import { useModal } from "../../context/Modal";
import "./editPin.css"

const EditPin = ({pin}) => {
  // const { pinId } = useParams();
  const pinId = pin.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const {closeModal} = useModal();
  const [name, setName] = useState("");
  const [nameCount, setNameCount] = useState(0);
  const [description, setDescription] = useState("");
  const [desCount, setDesCount] = useState(0);
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [resErrors, setResErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const categories = ["Art", "Food", "Tech"];
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (pin) {
      setName(pin.name);
      setNameCount(name.length);
      setDescription(pin.description);
      setDesCount(description.length);
      setCategory(pin.category);
      setUrl(pin.url);
    }
    return (()=>{
      pinsAction.actionClearPin();
      pinsAction.actionClearPins();
    })
    
  }, [pin]);

  const updateName = (e) => {
    setName(e.target.value);
    setNameCount(e.target.value.length)
  }
  const updateDescription = (e) => {
    setDescription(e.target.value)
    setDesCount(e.target.value.length)
  };
  const updateCategory = (e) => setCategory(e.target.value);
  const updateUrl = (e) => setUrl(e.target.value);

  useEffect(()=>{
      const err = {};
      if(!name.length) err.name = '* Name is required'
      if (name.length > 50) err.name = "* The max is 50 characters.";
      if(!description.length) err.description='* Description is required'
      if (description.length > 255)
      err.description = "* Description length can only have 255 characters.";
      if(!url.length) err.url='* Image is required'
      if(!category.length) err.category = '* Category is required'
      setErrors(err)
  },[name, description, url, category])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setResErrors({});

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("id", pinId);
    formData.append("user_id", currentUser.id);

    if (!Boolean(Object.values(errors).length)) {
      const updatedRes = await dispatch(pinsAction.updatePin(formData, pinId));
      if (!updatedRes.errors) {
        await closeModal();
        history.push(`/pins/${updatedRes.id}`);
        await setHasSubmitted(false);
      } else {
        await setResErrors(updatedRes.errors);
      }
    }
  };

  const cancelClick = (e) => {
    e.preventDefault();
    // history.push(`/pins/current`);
    closeModal();
  };
  const maxCharClassNameHandle = (desCount) => {
    if (desCount === 255) return "showCharacterLengthEdit reachedMaxEdit";
    return "showCharacterLengthEdit";
  };
  const nameCountClassHandler = (nameCount) => {
    if (nameCount === 50) return "showCharacterLengthEdit reachedMaxEdit";
    return "showCharacterLengthEdit";
  };
  const handleClosedModal = (e) =>{
    e.preventDefault();
    closeModal();
  }

  if (!pin) return <h1>No pins found</h1>;

  return (
    <div className="editPinModal">
      <h1>Edit this Pin</h1>
      <form onSubmit={handleSubmit} className="editForm">
        <div className="formTop">  
        <div className="leftSideEdit">
          <div className="labelNinput">
            <label>Title</label>
            <button onClick={handleClosedModal} className="closeButtonEdit">
              <i class="fa-solid fa-xmark fa-2xl"></i>
            </button>
            <div className="inputFieldEdit">
              <input
                maxLength={50}
                className="input"
                type="text"
                onChange={updateName}
                value={name}
                placeholder="Add your title"
                name="name"
                ></input>
                <p className={nameCountClassHandler(nameCount)}>
                {nameCount} /50 characters
              </p>
              {hasSubmitted ? <p className="error">{errors.name}</p> : null}
            </div>
          </div>
          <div className="labelNinput">
            <label>Category</label>
            <div className="inputFieldEdit">
              <select
                className="select"
                onChange={updateCategory}
                value={category}
                name="category"
                placeholder="Choose a category"
                >
                <option value=""></option>
                {categories.map((c) => (
                  <option value={c} key={c}>{c}</option>
                  ))}
              </select>
              {hasSubmitted ? (
                  <p className="errorEdit">{errors.category}</p>
                  ) : null}
            </div>
          </div>
          <div className="labelNinput">
            <label>Description</label>
            <div className="inputFieldEdit">
              <textarea
                className="input"
                type="text"
                onChange={updateDescription}
                value={description}
                placeholder="Tell everyone what your Pin is about"
                name="description"
                ></textarea>
                <p className={maxCharClassNameHandle(desCount)}>
                {desCount} /255 characters
              </p>
              {hasSubmitted ? (
                <p className="errorEdit">{errors.description}</p>
                ) : null}
            </div>
          </div>
        </div>
        <div className="rightSideEdit">
          <img src={pin.url} alt="pin.url" />
        </div>
        </div>
        <div className="formBottom">
          <div className="bottomLeft">
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteModal pin={pin} />}
            />
          </div>
          <div>
            <button 
            className="cancelButton"
            onClick={cancelClick}>Cancel</button>
            <button 
            className="submitButtonEdit"
            type="submit">Update</button>
          </div>
        </div>
      </form>
    
    </div>
  );
};

export default EditPin;
