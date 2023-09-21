import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { useHistory } from "react-router-dom";
import * as pinsAction from "../../store/pin";
import "./CreatePin.css";
import { useModal } from "../../context/Modal";

const CreatePin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const categories = ["Art", "Food", "Tech"];
  const [name, setName] = useState("");
  const [nameCount, setNameCount] = useState(0);
  const [description, setDescription] = useState("");
  const [desCount, setDesCount] = useState(0);
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState({});
  const [category, setCategory] = useState(categories[0]);
  const [errors, setErrors] = useState({});
  const [resErrors, setResErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    const err = [];
    if (!name.length) err.name = "* Name is required";
    if (name.length > 50) err.name = "* The max is 50 characters.";
    if (!description.length) err.description = "* Description is required";
    if (description.length > 255)
      err.description = "* Description length can only have 255 characters.";
    if (!url) err.url = "* Image is required";
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

    if (!Boolean(Object.values(errors).length)) {
      const createdRes = await dispatch(pinsAction.createPin(formData));
      if (!createdRes.errors) {
        closeModal();
        history.push(`/pins/${createdRes.id}`);
        await reset();
      } else {
        await setResErrors(createdRes.errors);
      }
    }
  };

  const maxCharClassNameHandle = (desCount) => {
    if (desCount === 255) return "showCharacterLength reachedMax";
    return "showCharacterLength";
  };

  const nameCountClassHandler = (nameCount) => {
    if (nameCount === 50) return "showCharacterLength reachedMax";
    return "showCharacterLength";
  };

  const handleClosedModal = (e) => {
    e.preventDefault();
    closeModal();
  };

  const reset = () => {
    setName("");
    setDescription("");
    setCategory("");
    setUrl("");
    setErrors({});
    setResErrors({});
    setHasSubmitted(false);
  };

  const handleOnDrop = (files) => {
    setUrl(files[0]);
    let pre = {};
    pre.preview = URL.createObjectURL(files[0]);
    setPreview(pre);
  };

  const removeHandler = (e) => {
    e.preventDefault();
    setUrl([]);
    setPreview({});
  };

  // rendering a thumbnail (or preview) of uploaded or selected files
  const thumb = (files) => {
    return (
      <div>
        {preview?.preview ? (
          <img
            className="previewImage"
            src={preview.preview}
            alt="preview"
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(preview.preview);
            }}
          />
        ) : null}
        {preview?.preview ? (
          <div className="trashDiv">
            <button
              onClick={removeHandler}
              className="trashbutton left"
              // data-text attribute is a custom attribute that might be used for tooltips or some other UI/UX purpose
              data-text="Delete image"
            >
              <i className="fa-solid fa-trash-can fa-xl"></i>
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="create-new_pin-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <ul>
          {hasSubmitted && Boolean(Object.values(resErrors).length) ? (
            <li>{Object.values(resErrors)}</li>
          ) : null}
        </ul>

        <div className="create_form">
          <div className="left-Side">
            <button onClick={handleClosedModal} className="closeButton">
              <i class="fa-solid fa-xmark fa-2xl"></i>
            </button>

            <Dropzone
              onDrop={handleOnDrop}
              multiple={false}
              className="dropzone"
              // restricts the file types
              accept={"image/*"}
            >
              {({
                getRootProps, //returns properties that need to be spread onto the dropzone
                getInputProps, //returns properties for the file input
                isDragActive, //indicates whether a file is currently being dragged over the dropzone
                acceptedFiles, //array of accepted files
              }) => (
                <section>
                  <div
                    // spread properties returned by getRootProps
                    {...getRootProps({ className: "dropzone" })}
                    className="image_drop_zone"
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <div className="dragActive">
                        <p className="postDate">
                          Release to drop the files here
                        </p>
                        <p className="recommend">
                          Recommendation: Use high-quality .jpg/.png <br />
                          files less than 20MB
                        </p>
                      </div>
                    ) : (
                      <div className="dragNotActive">
                        <i
                          className="fa-solid fa-arrow-up-from-bracket fa-xl"
                          style={{ color: "#818488;", marginBottom: "20px" }}
                        ></i>
                        <p className="postDate">
                          Drag and drop or click to upload
                        </p>
                        <p className="recommend">
                          Recommendation: Use high-quality .jpg/.png <br />
                          files less than 20MB
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Asides are frequently presented as sidebars or call-out boxes. */}
                  {/* show a preview of the file */}
                  <aside className="preview"> {thumb(acceptedFiles)} </aside>
                </section>
              )}
            </Dropzone>
            {hasSubmitted ? (
              <p className="error"> {errors.url}</p>
            ) : (
              <p className="noErrorDisplay">{"  "}</p>
            )}
          </div>
          <div className="right-Side">
            <div className="category-save_container">
              <button id="save-create_btn" type="submit">
                Create
              </button>
            </div>

            <div className="add-your_title">
              <input
                maxLength={50}
                id="ad-your_title-input"
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                  setNameCount(e.target.value.length);
                }}
                value={name}
                placeholder="Add your title"
                name="name"
              ></input>
              <p className={nameCountClassHandler(nameCount)}>
                {nameCount} /50 characters
              </p>
              {hasSubmitted ? (
                <p className="error"> {errors.name}</p>
              ) : (
                <p className="noErrorDisplay">{"  "}</p>
              )}
            </div>
            <div className="userInfo">
              <img
                src={currentUser.profile_pic}
                alt="profile_img"
                className="profile_pic"
              />
              <div>
                <p className="userName">
                  {currentUser.first_name}
                  {currentUser.last_name}
                </p>
                <p className="userName">
                  {currentUser.followers.length}
                  {currentUser.followers.length <= 1
                    ? ` follower`
                    : ` followers`}
                </p>
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
                {categories.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <div>
              <input
                maxLength={255}
                id="description-input_"
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDesCount(e.target.value.length);
                }}
                value={description}
                placeholder="Tell everyone what your Pin is about             😃"
                name="description"
              ></input>
              <p className={maxCharClassNameHandle(desCount)}>
                {desCount} /255 characters{" "}
              </p>
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
