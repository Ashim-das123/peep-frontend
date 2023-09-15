import React, { useState, useEffect } from 'react'
import '../css/Profile.css'
import PostDetail from '../components/PostDetail';
import Profilepic from '../components/Profilepic';
const Profile = () => {
    var defaultPicLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    const [pic, setPic] = useState([]);
    const [show, setShow] = useState(false);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState("");
    const [changePic, setChangePic] = useState(false)

    // to show and hide the users posts dialougue
    const togglePostDetails = (posts) => {
        if (show) {
            setShow(false);
        }
        else {

            setShow(true);
            setPosts(posts);


        }

    }
    const changeprofile = () => {
        if (changePic) {
            setChangePic(false);
        }
        else {
            setChangePic(true)
        }
    }


    useEffect(() => {

        fetch(`https://peep-backend.onrender.com/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then((result) => {
                setPic(result.post)
                setUser(result.user)
                console.log(pic)
            })

    }, [])


    return (

        <div className='profile'>
            {/* profile frame */}

            <div className="profile-frame">
                <div className="profile-pic">
                    <img
                        onClick={changeprofile} // click korle tobei hbe
                        src={user.Photo ? user.Photo : defaultPicLink} alt="" />
                </div>
                <div className="profile-data">
                    <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
                    <div className="profile-info" style={{ display: 'flex', gap: 15 }}>
                        <p>{pic ? pic.length : "0"} posts</p>
                        <p>{user.followers ? user.followers.length : "0"} followers</p>
                        <p>{user.followings ? user.followings.length : "0"} following</p>
                    </div>
                </div>
            </div>
            <hr style={{ width: "97%", opacity: "0.4", margin: "25px auto" }} />
            <div className="profile-gallery">
                {pic.map((pics) => {
                    return <img key={pic._id} src={pics.photo}
                        onClick={() => {
                            togglePostDetails(pics)
                        }}
                        className="item" alt='' />
                })}
            </div>
            <div>

            </div>
            {show &&
                <PostDetail item={posts} togglePostDetails={togglePostDetails} />
            }
            {
                changePic &&
                <Profilepic changeprofile={changeprofile} />
            }
        </div>
    )
}

export default Profile;

