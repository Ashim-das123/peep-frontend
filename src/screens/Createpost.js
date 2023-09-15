import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Createpost.css'
import toast from 'react-hot-toast'


const Createpost = () => {

    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        if (url) {  // useffect website first time open korleo run hoy tai if condition
            // saving image url to mongodb
            fetch("https://peep-backend.onrender.com/createPost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({ // server a data pathonor somoy object data k string a convert kore
                    body,
                    pic: url   // pic var er moddhe url ta dilam 
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        toast.error(data.error);
                    } else {
                        toast.success("Successfully posted")
                        navigate("/")
                    }
                }
                )
                .catch(err => console.log(err))

        }


    }, [url]) // url change hole call jabe 




    // posting image to cluodinary
    const postDetails = () => {
        console.log(body, image);
        const data = new FormData(); // akta object create korbo sekhane append korbo ki ki THAKBE
        data.append("file", image);
        data.append("upload_preset", "peep-website");
        data.append("cloud_name", "ashimcloud")

        fetch("https://api.cloudinary.com/v1_1/ashimcloud/image/upload", {

            method: "post",
            body: data
        }).then(res => res.json()) // .json o akta promise return kore tai akhane r akta then function dewa ache r fetch a 2ta then thake 
            .then(data => setUrl(data.url)/*console.log(data.url)*/)      // json object theke url ta ber kore nichhi
            .catch(err => console.log(err))



    }
    // image preview code
    const loadfile = (event) => {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src)
        }
    };
    return (
        <div className='createPost'>
            {/* header */}
            <div className="post-header">
                <h4 style={{ margin: "3px auto" }}>Create new post</h4>
                <button id='post-btn' onClick={() => { postDetails() }}>Share</button>

            </div>
            {/* image preview */}
            <div className="main-div">
                <img id="output" src='https://cdn.icon-icons.com/icons2/510/PNG/512/image_icon-icons.com_50366.png' alt='' />
                <input type="file" accept="image/*" onChange={(event) => {
                    loadfile(event)
                    setImage(event.target.files[0])
                }} />
            </div>
            {/* details */}

            <div className="details">
                <div className="card-header">
                    <div className="card-pic">
                        <img src="https://plus.unsplash.com/premium_photo-1676299910876-747eeb0c11dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80" alt="" />
                    </div>
                    <h5>Ashim</h5>
                </div>
                <textarea value={body} onChange={(e) => {
                    setBody(e.target.value)
                }} type="text" placeholder='Write something...'></textarea>
            </div>
        </div>


    )
}

export default Createpost