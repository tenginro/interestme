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
                <div>
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
                <div>
                    <label></label>
                </div>
            </form>
        </div>
    )
}