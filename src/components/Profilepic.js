import React, { useState, useEffect, useRef } from 'react'; //useref ta usestate er moto but kono val cjange hole page render hbe ne ata valo

const Profilepic = ({ changeprofile }) => {
    const hiddenFileInput = useRef(null);

    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");


    // posting image to cluodinary 
    const postDetails = () => {

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
    const postPic = () => {

        // saving image url to mongodb
        fetch("https://peep-backend.onrender.com/uploadProfilePic", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({ // server a data pathonor somoy object data k string a convert kore

                pic: url   // pic var er moddhe url ta dilam 
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                changeprofile();// dialog the close korar jonno 
                window.location.reload();// this is used for reload the current page
            }
            )
            .catch(err => console.log(err))
    }


    const handleClick = () => {
        hiddenFileInput.current.click()
    }

    useEffect(() => {
        if (image) {
            postDetails()
        }

    }, [image])
    useEffect(() => {
        if (url) {
            postPic();
        }

    }, [url])

    return (
        <div className='ProfilePic darkBg'>
            <div className="changePic centered">
                <div>
                    <h2>Change Profile Photo</h2>
                </div>
                <div style={{ borderTop: "1px solid #00000042" }}>
                    <button className='upload-btn' style={{ color: "#009566" }}
                        onClick={handleClick}

                    >Upload Photo</button>
                    {/* upload photo click er sathe sathe jaate input tag ta trigger hoy */}
                    <input type="file" ref={hiddenFileInput} accept='image/*' style={{ display: "none" }}
                        onChange={(e) => { setImage(e.target.files[0]) }}
                    />
                </div>
                <div style={{ borderTop: "1px solid #00000042" }}>
                    <button className='upload-btn'
                        onClick={() => {
                            setUrl(null)
                            postPic()
                        }}
                        style={{ color: "#ED4956" }}
                    >Remove Current Photo</button>
                </div>
                <div style={{ borderTop: "1px solid #00000042" }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15 }} onClick={changeprofile}>cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Profilepic