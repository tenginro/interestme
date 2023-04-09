import React, {useState, useEffect} from 'react';
import * as pinsActions from '../../store/pin';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';


function DeleteModal ({pin}) {
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const history = useHistory();

    const ClickYes = async (e) => {
        e.preventDefault();
        await dispatch(pinsActions.deletePin(pin.id))
        await closeModal()
        await dispatch(pinsActions.getUserPins());
        await dispatch(pinsActions.getAllPins())
        
    }

    const ClickNo = (e) => {
        e.preventDefault();
        closeModal(); 
    }

    return (
        <div className='deleteModal'>
            <h1>Are you sure?</h1>A
            <h4>Once you delete a Pin, you can't undo it!</h4>
            <div>
                <div className='submitDiv de'>
                    <button onClick={ClickYes}
                    className='createSubmit'
                    >Delete</button>
                </div>
                <div className='submitDiv de'>
                    <button onClick={ClickNo}
                    className='createSubmit'
                    >Cancel</button>
                </div>
            </div>
        </div>
    )

}

export default DeleteModal;