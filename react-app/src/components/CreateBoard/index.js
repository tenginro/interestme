import BoardForm from "../BoardForm";

const CreateBoard = () => {
    const newBoard = {
        name: "",
        description: ""
    }
    return (<div>
        <BoardForm
    newBoard={newBoard}
    formType="Create board"
    submitType="Create"
        />
    </div>)
}

export default CreateBoard;
