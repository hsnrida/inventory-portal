import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    const logout = () => {
        axios.defaults.baseURL = "http://inventory.test/api/";
        const token = localStorage.getItem('token');
        console.log("token");

        axios.post('logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            localStorage.setItem('token', null);
            localStorage.setItem('user', null);
            navigate('/', { replace: true });


        }).catch(error => {
            console.error(error);
        });
        navigate('/', { replace: true });
    };

    logout();
}