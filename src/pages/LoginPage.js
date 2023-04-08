import Login from "../components/Login"
import { Link } from 'react-router-dom';


export default function LoginPage() {
    return (
        <>
            <div className="flex items-center justify-center h-screen">

                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Login to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 mt-5">
                        Don't have an account yet? {'  '}
                        <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                            Signup
                        </Link>
                    </p>
                    <Login />
                </div>
            </div>
        </>
    )
}