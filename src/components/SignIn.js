import React, { useState, useContext } from 'react'
import "../css/SignIn.css";
import toast from 'react-hot-toast'
import loginlogo from '../images/login.png'
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
const SignIn = () => {

    const { setUserLogin } = useContext(LoginContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  // regex is used for email validation regex in js

    const postData = () => {
        if (!emailRegex.test(email)) { // original email jodi reges er sathe match na kore tar mane ata invalid email
            toast.error("Invalid email");
            return;
        }

        fetch("https://peep-backend.onrender.com/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({   // j object  data gulo pathobo seguloke string form a convert korbo
                email: email,
                password: password,

            })
        }).then((res) => {

            return res.json();
        }).then((data) => {

            if (data.error) {
                toast.error(data.error);
            }
            else {
                toast.success("Signed in successfully");
                console.log(data);
                localStorage.setItem("jwt", data.token);  // server a sign in korar por j jwt token ta frontend a asche otake local a store korlam ata li val pair a thakbe 
                localStorage.setItem("user", JSON.stringify(data.user));
                setUserLogin(true);
                navigate("/");
            }
            console.log(data)
        })

    }

    const handleKeyPress = (e) => {
        if (e.code === 'Enter') {
            postData();
        }
    }


    return (
        <div className='signIn'>
            <div>
                <div className='loginForm'>
                    <img src={loginlogo} alt='' style={{ height: 110, width: 110 }} />
                    <div>
                        <input type='email' name='email' id='email' value={email} placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} onKeyUp={handleKeyPress} />
                    </div>
                    <div>
                        <input type='password' name='password' id='password' value={password} placeholder='Password' onChange={(e) => { setPassword(e.target.value) }}
                            onKeyUp={handleKeyPress} />
                    </div>

                    <input type='submit' value="Sign In" id='signin-btn' onClick={() => { postData() }} />


                </div>
                <div className='loginForm2'>
                    Don't have an account ?&nbsp;
                    <Link to="/signup">
                        <span style={{ color: "#00a300", cursor: "pointer", fontSize: 16 }}>Sign Up</span>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default SignIn