import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';
import '../css/Home.css'
const Home = () => {

    var defaultPicLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    const navigate = useNavigate();

    const [data, setData] = useState([]); // allposts gulo k array te store kore rakhbo trpr map kore display korabe

    const [comment, setComment] = useState("")
    const [show, setShow] = useState(false);
    const [item, setItem] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            navigate("/signup")
        }


        // Fetching all posts from db 
        fetch("https://peep-backend.onrender.com/allposts", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result)
            }
            )
            .catch(error => console.log(error));
    }, []);

    // to show and hide the comment dialougue
    const toggleComment = (post) => {
        if (show) {
            setShow(false);
        }
        else {
            setItem(post);
            setShow(true);


        }

    }

    const likedPost = (id) => {
        fetch("https://peep-backend.onrender.com/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then((res) => res.json())
            .then((result) => {
                const newData = data.map((post) => {
                    if (post._id == result._id) {
                        return result;
                    } else {
                        return post
                    }
                })
                setData(newData);
                console.log(result)
            })
    }
    const unlikedPost = (id) => {
        fetch("https://peep-backend.onrender.com/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then((res) => res.json())
            .then((result) => {
                const newData = data.map((post) => {
                    if (post._id == result._id) {
                        return result;
                    } else {
                        return post
                    }
                })
                setData(newData);

                console.log(result)
            })
    }

    // function for make  comment
    const makeComment = (text, id) => {
        // console.log(comment)
        fetch("https://peep-backend.onrender.com/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                text: text,
                postId: id
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map((post) => {
                    if (post._id == result._id) {
                        return result;
                    } else {
                        return post
                    }
                })
                setData(newData);

                setComment("");  // comment hole seta textfield e r dekhabe na
                toast.success("Comment posted")
                console.log(result)
            })

    }

    return (
        <div className='home'>
            {/* card */}

            { // since javascript er map function tai inside the braces
                data.map((post) => {
                    return (
                        <div className="card">
                            {/* card header */}
                            <div className="card-header">
                                <div className="card-pic">
                                    <img src={post.postedBy.Photo ? post.postedBy.Photo : defaultPicLink} alt='' />
                                </div>
                                <h5>
                                    <Link to={`/profile/${post.postedBy._id}`} style={{ color: "black", fontWeight: "bold" }}>
                                        {post.postedBy.name}
                                    </Link>
                                </h5>
                            </div>
                            {/* card image */}
                            <div className="card-image">
                                <img src={post.photo} alt="" />
                            </div>
                            {/* card content */}
                            <div className="card-content">
                                {    //localstorage theke jodi kono object theke kichu nile JSON.parse 
                                    post.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                                        ?
                                        (<span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => unlikedPost(post._id)}>
                                            favorite
                                        </span>)
                                        : (<span className="material-symbols-outlined" onClick={() => likedPost(post._id)}>
                                            favorite
                                        </span>)
                                }


                                <p>{post.likes.length} likes</p>
                                <p>{post.body}</p>
                                <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => { toggleComment(post) }}>View all comments</p>
                            </div>
                            {/* add comment */}
                            <div className="add-comment">
                                <span className="material-symbols-outlined"> mood </span>
                                <input type="text" placeholder='Add a comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
                                <button className='comment-btn' onClick={() => { makeComment(comment, post._id) }}>Post</button>
                            </div>
                        </div>
                    )
                })

            }
            {/* show comments */}
            {show && (
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
                                <input type="text" placeholder='Add a comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
                                <button className='comment-btn'
                                    onClick={() => {
                                        makeComment(comment, item._id);
                                        toggleComment()

                                    }}
                                >Post</button>
                            </div>

                        </div>
                    </div>
                    <div className="close-comment" onClick={() => { toggleComment() }}>
                        <span className="material-symbols-outlined material-symbols-outlined-comment">
                            close
                        </span>
                    </div>
                </div>
            )
            }



        </div>
    )
}

export default Home