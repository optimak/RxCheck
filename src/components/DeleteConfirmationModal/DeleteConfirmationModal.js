import './DeleteConfirmationModal.scss';

function DeleteConfirmationModal({ isOpen, onDeleteConfirm, onCancel, itemId }) {
    if (!isOpen) return null;

    return (
        <div className="delete-modal">
            <div className="delete-modal__inner">
                <h6>Delete Comment</h6>

                <p>Are you sure you want to delete this comment?</p>
                <div>
                    <button className="delete-modal__cancel" onClick={onCancel}>Cancel</button>
                    <button className="delete-modal__delete" onClick={() => onDeleteConfirm(itemId)}>Delete</button>


                </div>

            </div>
        </div>
    );
}
export default DeleteConfirmationModal