import React from 'react'
import "../css/PostDetail.css"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const PostDetail = ({ item, togglePostDetails }) => {
    const navigate = useNavigate();

    // api for delete post from profile

    const removePost = (postId) => {

        if (window.confirm("Are you sure ?")) {
            fetch(`https://peep-backend.onrender.com/deletepost/${postId}`, {
                method: "delete",
                headers: {

                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);

                    togglePostDetails();
                    navigate("/")
                    toast.success("Successfully deleted")
                });
        }

    }

    return (
        <div className="showComment">
            <div className="container">
                <div className="postPic">
                    <img src={item.photo} alt="" />
                </div>
                <div className="details">
                    <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
                        <div className="card-pic">
                            <img src="https://plus.unsplash.com/premium_photo-1676299910876-747eeb0c11dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80" alt="" />
                        </div>
                        <h5>{item.postedBy.name}</h5>
                        <div className="deletePost" onClick={() => { removePost(item._id) }}>
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </div>
                    </div>
                    {/* comment section */}
                    <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>
                        {
                            item.comments.map((comment) => {
                                return (
                                    <p className='comm'>
                                        <span className='commenter' style={{ fontWeight: "bolder" }}>{comment.postedBy.name}{" "}</span>
                                        <span className='commentText'>{comment.comment}</span>
                                    </p>
                                )
                            })
                        }

                    </div>
                    {/* card content */}
                    <div className="card-content">

                        <p>{item.likes.length}</p>
                        <p>{item.body}</p>
                    </div>
                    {/* add comment */}
                    <div className="add-comment">
                        <span className="material-symbols-outlined"> mood </span>
                        <input type="text" placeholder='Add a comment'
                        //  value={comment}
                        />
                        <button className='comment-btn'
                        // onClick={() => {
                        //     makeComment(comment, item._id);
                        //     toggleComment()

                        // }}
                        >Post</button>
                    </div>

                </div>
            </div>
            <div className="close-comment"
                onClick={() => { togglePostDetails() }}
            >
                <span className="material-symbols-outlined material-symbols-outlined-comment">
                    close
                </span>
            </div>
        </div>
    )
}

export default PostDetail