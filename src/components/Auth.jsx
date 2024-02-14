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
        <div >
        <div class="max-w-md mx-auto p-8  pt-10 rounded-md shadow-md">
        <h1 class="text-center text-blue-400 font-bold text-4xl mb-8">Book App 📚</h1>
        <form class="flex flex-col" onSubmit={submitForm}>
            {btnSignUp && (
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    class="mb-4 p-2 rounded-md border text-blue-800 focus:outline-none focus:border-blue-400"
                />
            )}
            <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                class="mb-4 p-2 rounded-md border text-blue-800 focus:outline-none focus:border-blue-400"
            />
            <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
                class="mb-4 p-2 rounded-md border text-blue-800 focus:outline-none focus:border-blue-400"
            />
            {btnSignUp && (
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    class="mb-4 p-2 rounded-md border  focus:outline-none focus:border-blue-400"
                />
            )}
            <button type="submit" class="bg-indigo-900 text-white font-bold py-2 rounded-md">
                {btnSignUp ? 'Sign Up' : 'Login'}
            </button>
        </form>
        <p class="mt-4 "> {btnSignUp ? 'already have a account' : 'new user'} </p>
        <button onClick={changeBtn} class="text-blue-400 hover:underline  focus:outline-none">
            {btnSignUp ? 'Login' : 'Sign Up'}
        </button>
    </div>
    </div>
    
    );
};


export default Auth;
