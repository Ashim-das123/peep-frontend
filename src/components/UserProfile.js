import React, { useState, useEffect } from 'react'
import '../css/Profile.css'
// import PostDetail from './PostDetail';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    var defaultPicLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"


    const { userid } = useParams();
    const [isFollow, setIsFollow] = useState(false)
    const [user, setUser] = useState("");
    const [pic, setPic] = useState([]);
    const [posts, setPosts] = useState([]);

    // to follow user

    const followUser = (userId) => {
        fetch("https://peep-backend.onrender.com/follow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userId
            })
        })
            .then((res) => res.json()) // akhane kono curly braces thakbe na
            .then((data) => {
                console.log(data);
                setIsFollow(true)
            })
    }
    // to unfollow user

    const unfollowUser = (userId) => {
        fetch("https://peep-backend.onrender.com/unfollow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userId
            })
        })
            .then((res) => { res.json() })
            .then((data) => {
                console.log(data);
                setIsFollow(false)
            })
    }







    useEffect(() => {

        fetch(`https://peep-backend.onrender.com/user/${userid}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                setUser(result.user);
                setPosts(result.post)
                if (result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)) { // open user er followers array te sign kora user er id find korbo jdi thake tahole follow kora ache
                    setIsFollow(true)
                }
            })

    }, [isFollow])


    return (

        <div className='profile'>
            {/* profile frame */}

            <div className="profile-frame">
                <div className="profile-pic">
                    <img src={user.Photo ? user.Photo : defaultPicLink} alt="" />
                </div>
                <div className="profile-data">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h1 >{user.name}</h1>
                        <button className='followBtn' onClick={() => {
                            if (isFollow) {
                                unfollowUser(user._id)
                            } else {
                                followUser(user._id)
                            }
                        }
                        }
                        >{isFollow ? "Unfollow" : "Follow"}</button>
                    </div>

                    <div className="profile-info" style={{ display: 'flex', gap: 15 }}>
                        <p>{posts.length} posts</p>
                        <p>{user.followers ? user.followers.length : "0"} followers</p>
                        <p>{user.following ? user.following.length : "0"} following</p>
                    </div>
                </div>
            </div>
            <hr style={{ width: "97%", opacity: "0.4", margin: "25px auto" }} />
            <div className="profile-gallery">
                {posts.map((pics) => {
                    return <img key={pic._id} src={pics.photo}
                        className="item" alt='' />
                })}
            </div>
            <div>

            </div>
            {/* {show &&
                <PostDetail item={posts} togglePostDetails={togglePostDetails} />
            } */}
        </div>
    )
}

export default UserProfile;

