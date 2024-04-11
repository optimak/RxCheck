import './CommentForm.scss';
import defaultImage from "../../assets/icons/avatar.png";

import { baseUrl } from "../../consts";
import axios from 'axios';


export default function CommentForm({medId, profileId}) {

    const handleSubmitComment = async (event) => {
        event.preventDefault();
    
        try {
          await axios.post(`${baseUrl}comments/${medId}`, {
            user_id: profileId,
            medication_id: medId,
            content: event.target.comment.value,
          });
        window.location.reload();

        } catch (error) {
        console.log(error)
        }
      };

    return (
        <section className="main__add-comment">
            <img className="main__add-comment-avatar" src={defaultImage} alt="commenter's avatar"></img>
            <form onSubmit={handleSubmitComment} className="main__comment-form">
                <label className="main__label" htmlFor="comment">
                    WRITE A REVIEW
                </label>
                <input className="main__textbox" type="text" name="comment" id="comment" placeholder='Add your review' />
                <button className="main__button">
                    {/* <img className="main__button-icon" src={commentIcon} alt="comment icon"></img> */}

                    COMMENT
                </button>
            </form>
        </section>
    )
}
