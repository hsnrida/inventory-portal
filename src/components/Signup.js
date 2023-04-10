import axios from 'axios';
import { useState } from 'react';
import { signupFields } from "../constants/FormFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';


const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);

  const navigate = useNavigate();
  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserAccount()
  }

  const createUserAccount = () => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    axios.post('register', {
      name: signupState.username,
      email: signupState.email_address,
      password: signupState.password,
      password_confirmation: signupState.confirm_password,

    })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.access_token);
        navigate('/products', { replace: true });
      }).catch(error => {
        console.error(error);
      });
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
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
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>



    </form>
  )
}