import { Fragment } from "react";
import Navbar from "../layouts/Navbar";
import axios from 'axios';


const HomePage = () => {

  const test = async () =>{
    axios.defaults.baseURL = "http://inventory.test/api/";
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await axios.get('home', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        // Store the token in local storage or elsewhere in your React app
        // Redirect the user to a protected route or perform other actions
        
      } catch (error) {
        console.error(error);
      }
}
  return (
    <Fragment>

    <Navbar/>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to my website!</h1>
          <p className="text-gray-700 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ornare tellus. Donec
            ullamcorper mi id risus dictum auctor. Nullam feugiat leo vitae arcu placerat, a
            suscipit nisl pharetra. Donec consequat, velit nec dignissim aliquam, eros lorem
            aliquam metus, in dapibus mauris metus quis ex.
          </p>
          <button onClick={test} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Learn More
          </button>
        </div>
    </Fragment>
    
  );
};

export default HomePage;
