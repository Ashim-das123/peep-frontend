
import { Link, useNavigate } from "react-router-dom"; // useNaviagte er sahajye user k jekono page a redirect korte pari
import { useState } from "react";
import logo from "../images/Peep1.png";
import toast from 'react-hot-toast'
import "../css/SignUp.css";
const SignUp = () => {

    const navigate = useNavigate();  // var name j kono hote pare abar ei var er sathe jekono jaygay use krte pari


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");


    // toast
    // const notification = (msg) => toast.error(msg);  //another way

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  // regex is used for email validation regex in js
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;  // regex in react

    const postData = () => {
        // checking mail
        if (!emailRegex.test(email)) { // original email jodi reges er sathe match na kore tar mane ata invalid email
            toast.error("Invalid email");
            return;
        }
        else if (!passRegex.test(password)) {
            // password difficulty checking
            toast.error("Password must contains at least 8 characters,including atleast 1 number and 1 includes both lower and uppercase letters and special characters for examples #,?,@")
            return;
        }


        // sending data to server
        fetch("https://peep-backend.onrender.com/signup", { // fetch a url + kichu object tahke
            method: "post",
            headers: {
                "Content-Type": "application/json"  // post method a headrer must
            },
            body: JSON.stringify({   // j data gulo pathobo seguloke json form a convert korbo

                name: name,
                email: email,
                userName: userName,
                password: password,

            })
        }).then(res => {
            return res.json(); // Return the result of res.json()
        }).then(data => {
            if (data.error) {
                toast.error(data.error)
                // notification(data.error); //another way
            }
            else {
                toast.success(data.message);
                navigate("/signin")
            }
            console.log(data);

        }).catch(error => {
            console.error("Error:", error);
            // Handle any other error conditions here
        });


        // .then(res => {
        //     res.json()
        // }).then(data => {
        //     if (data.error) {
        //         notification(data.error);
        //     }
        //     console.log(data);
        // })
    }
    const handleKeyPress = (e) => {
        if (e.code === 'Enter') {
            postData();
        }
    }

    return (
        <div className='signUp'>
            <div className='form-container'>
                <img className="signUpLogo" src={logo} alt='' />
                <div className='form'>
                    <p className='logInPara'>
                        SignUp to see photos and videos <br />from your friends.
                    </p>
                    <div>
                        <input type='email' name="email" id='email' value={email} placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} onKeyUp={handleKeyPress} />
                    </div>
                    <div>
                        <input type='text' name="name" id='name' value={name} placeholder='Full name' onChange={(e) => { setName(e.target.value) }} onKeyUp={handleKeyPress} />
                    </div>
                    <div>
                        <input type='text' name="username" id='username' value={userName} placeholder='Username' onChange={(e) => { setUserName(e.target.value) }} onKeyUp={handleKeyPress} />
                    </div>
                    <div>
                        <input type='password' name="password" id='password' value={password} placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} onKeyUp={handleKeyPress} />
                    </div>
                    <p className='loginPara' style={{ fontSize: 12, color: "#717171" }}>
                        By signing up, you agree to out terms,<br /> privacy
                        policy and cookies policy.
                    </p>
                    <input type='submit' id='submit-btn' value="Sign Up" onClick={() => { postData() }} />

                </div>
                <div className="form2">
                    Already have an account ?&nbsp;
                    <Link to="/signin">
                        <span style={{ color: "#00a300", cursor: "pointer" }}>Sign In</span>
                    </Link>

                </div>

            </div>


        </div>
    )
}

export default SignUp