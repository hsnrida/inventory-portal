import Signup from "../components/Signup";
import { Link } from 'react-router-dom';


export default function SignupPage() {
    return (
        <>
            <div className="flex items-center justify-center h-screen">

                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Signup to create an account
                    </h2>
                    <p className="text-center text-sm text-gray-600 mt-5">
                        Already have an account? {'  '}
                        <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
                            Login
                        </Link>
                    </p>
                    <Signup />

                </div>
            </div>

        </>
    )
}