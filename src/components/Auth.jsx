import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const Auth = ({fetchData}) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [btnSignUp, setBtnSignUp] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(null)

    // handle value Change
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    // handle form submit
    const submitForm = async (e) => {
        e.preventDefault();
        const endpoint = btnSignUp ? '/signup' : '/login'; 
        try {
            const response = await fetch(`https://demo-node-api-sigma.vercel.app${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            console.log(response);
            // this is the data coming 
            const data = await response.json();
            console.log('Response from server:', data);
            if (response.ok) {
                setCookie('AuthToken', data.token, { path: '/' });
                setCookie('name', data.user.name, { path: '/' });
                setCookie('email', data.user.email, { path: '/' });
                console.log(cookies);

            }
            console.log('Received token from server:', data.token);
        
            console.log(data.token);
            console.log(data.user.name);
            fetchData()
   
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // change button from login to signup
    const changeBtn = () => {
        setBtnSignUp(!btnSignUp);
    };

    return (
        <div>
        <h1 className="text-center text-blue-400 font-bold text-4xl sm:text-5xl pt-8">
              My Book List 📚
            </h1>
            <form onSubmit={submitForm}>
               {btnSignUp &&
                <input
                    type='text'
                    name='name'
                    value={user.name}
                    onChange={handleChange}
                    placeholder='Enter your name'
                />
                } 
                <input
                    type='email'
                    name='email'
                    value={user.email}
                    onChange={handleChange}
                    placeholder='Email'
                />
                <input
                    type='password'
                    name='password'
                    value={user.password}
                    onChange={handleChange}
                    placeholder='Password'
                />
                {btnSignUp && <input type='password' name='confirmPassword' placeholder='Confirm Password' />}
                <button type='submit'>{btnSignUp ? 'Sign Up' : 'Login'}</button>
            </form>
            <p>Click here for </p>
            <button onClick={changeBtn}>{btnSignUp ? 'Login' : 'Sign Up'}</button>
        </div>
    );
};


export default Auth;
