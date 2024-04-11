import React, { useState } from 'react'
//import { Link } from 'react-router-dom'
import Axios from 'axios'
import Layout from '../components/Layout';

const Lgportal = () => {

    const [error, setError] = useState('');
    const [checkdata, setCheckdata] = useState({
        username: "",
        password: ""
    });

    const user = localStorage.getItem('token');

    const checkUser = async (e) => {
        e.preventDefault();

        try {
            const { data: res } = await Axios.post('http://localhost:4000/api/checkLogin', checkdata);

            localStorage.setItem("token", res.checkdata);
            window.location = "/"


        } catch (error) {

            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }


    if (user) {
        return (
            <div>
                <Layout>

                    <div>
                        <button type='submit' onClick={logout}>Logout</button>
                    </div>
                </Layout>
            </div>

        )
    } else {
        return (
            <div>
                <Layout>

                    <div>
                        <div>
                            <div>
                                <h1>Login</h1>
                                <input
                                    type='text'
                                    placeholder='username'
                                    value={checkdata.username}
                                    onChange={(e) => setCheckdata({ ...checkdata, username: e.target.value })} />
                                <input
                                    type='password'
                                    placeholder='password'
                                    value={checkdata.password}
                                    onChange={(e) => setCheckdata({ ...checkdata, password: e.target.value })} />
                                {error && <p>{error}</p>}
                                <button type='submit' onClick={checkUser}>Login</button>

                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
        )
    }
}

export default Lgportal
