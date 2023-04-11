import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useHistory, useParams } from "react-router-dom";
import * as pinsAction from "../../store/pin";
import OpenModalButton from "../OpenModalButton/index";
import DeleteModal from "../DeletePinModal";

const EditPin = () => {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const pin = useSelector((state) => state.pins.singlePin);

  useEffect(() => {
    dispatch(pinsAction.getPinDetail(pinId));
  }, [dispatch, pinId]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
      setDescription(pin.description);
      setCategory(pin.category_id);
      setUrl(pin.url);
    }
  }, [pin]);

  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateCategory = (e) => setCategory(e.target.value);
  const updateUrl = (e) => setUrl(e.target.value);

  // useEffect(()=>{
  //     const err = [];
  //     if(!name.length) err.name = 'Name is required'
  //     if(!description.length) err.description='Description is required'
  //     if(!url.length) err.url='Image is required'
  //     if(!category.length) err.category = 'Category is required'
  //     setErrors(err)
  // },[name, description, url, category])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setResErrors({});

    // const payload = {
    //   ...pin,
    //   name,
    //   description,
    //   url,
    //   category,
    // };

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("id", pinId);

    formData.append("url", url);
    formData.append("user_id", currentUser.id);

    if (!Boolean(Object.values(errors).length)) {
      const updatedRes = await dispatch(pinsAction.updatePin(formData, pinId));
      if (!updatedRes.errors) {
        history.push(`/pins/${updatedRes.id}`);
        await setHasSubmitted(false);
      } else {
        await setResErrors(updatedRes.errors);
      }
    }
  };

  const cancelClick = (e) => {
    e.preventDefault();
    history.push(`/pins/current`);
  };

  if (!pin) return <h1>No pins found</h1>;

  return (
    <div>
      <h1>Edit this Pin</h1>
      <form onSubmit={handleSubmit}>
        <div className="leftSide">
          <div>
            <label>Title</label>
            <input
              type="text"
              onChange={updateName}
              value={name}
              placeholder="Add your title"
              name="name"
            ></input>
            {hasSubmitted ? <p className="error">{errors.name}</p> : null}
          </div>
          <div>
            <label>Category</label>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category}
              name="category"
              placeholder="Choose a category"
            >
              <option value=""></option>
              {categories.map((c) => (
                <option value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              onChange={updateDescription}
              value={description}
              placeholder="Tell everyone what your Pin is about"
              name="description"
            ></input>
            {hasSubmitted ? (
              <p className="error">{errors.description}</p>
            ) : null}
          </div>
        </div>
        <div className="rightSide">
          <img src={pin.url} alt="pin.url" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="bottom">
        <OpenModalButton
          buttonText="Delete"
          modalComponent={<DeleteModal pin={pin} />}
        />
        <div>
          <button onClick={cancelClick}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditPin;
