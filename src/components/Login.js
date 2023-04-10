import { useState } from 'react';
import { loginFields } from "../constants/FormFields";
import FormAction from "./FormAction";
import Input from "./Input";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    const authenticateUser = async () => {
        axios.defaults.baseURL = process.env.REACT_APP_API_URL;
        try {
            const response = await axios.post('login', {
                email: loginState.email_address,
                password: loginState.password,
            });
            const token = response.data.access_token;
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', token);

            navigate('/products', { replace: true });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />

                    )
                }
            </div>

            <FormAction handleSubmit={handleSubmit} text="Login" />

        </form>
    )
}