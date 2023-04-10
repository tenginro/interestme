import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as pinsAction from '../../store/pin';

const CreatePin = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});
    const [resErrors, setResErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    
    useEffect(()=>{
        const err = [];
        if(!name.length) err.name = 'Name is required'
        if(!description.length) err.description='Description is required'
        if(!url.length) err.url='Image is required'
        if(!category.length) err.category = 'Category is required'
        setErrors(err)
    },[name, description, url, category])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setHasSubmitted(true);
        await setResErrors({})

        const newPin ={
            name,
            description,
            url,
            category
        };
        if(!Boolean(Object.values(errors).length)){
            const createdRes = await dispatch(pinsAction.createPin(newPin))
            if(!createdRes.errors) {
                history.push(`/pins/${createdRes.id}`)
                await reset()
            } else {
                await setResErrors(createdRes.errors);
            }
        }
    }

    const reset = () => {
        setName('');
        setDescription('');
        setCategory('');
        setUrl('');
        setErrors({});
        setResErrors({});
        setHasSubmitted(false);
    };

    return (
        <div>
            <h1>Create a New Pin</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {hasSubmitted && Boolean(Object.values(resErrors).length) ? <li>{Object.values(resErrors)}</li> : null}
                </ul>
                <div className='leftSide'>
                    <label>Upload an Image</label>
                    <input
                    type='text'
                    onChange={(e)=>setUrl(e.target.value)}
                    value = {url}
                    placeholder='Drag and drop an image url to upload'
                    name = 'url'
                    >
                    </input>
                </div>
                <div className='rightSide'>
                    <div>
                        <input
                        type='text'
                        onChange={(e)=>setCategory(e.target.value)}
                        value={category}
                        placeholder='Choose a category'
                        name='category'
                        ></input>
                        <button 
                        type='submit'
                        >Save</button>
                    </div>
                    <div>
                        <input
                        type='text'
                        onChange={(e)=>setName(e.target.value)}
                        value={name}
                        placeholder='Add your title'
                        name='name'
                        ></input>
                        {hasSubmitted?
                            <p className='error'>{errors.name}</p> : null
                            }
                    </div>
                    <div>
                        <input
                        type='text'
                        onChange={(e)=>setDescription(e.target.value)}
                        value={description}
                        placeholder='Tell everyone what your Pin is about'
                        name='description'
                        ></input>
                        {hasSubmitted?
                            <p className='error'>{errors.description}</p> : null
                            }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePin;