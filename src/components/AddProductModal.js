import { useState} from "react";
import axios from 'axios';


export default function AddProductModal({ isOpen, onClose,onCreateProduct }) {
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.defaults.baseURL = process.env.REACT_APP_API_URL;
      const token = localStorage.getItem('token');
  
      const product = { type: type, description: description};
      axios.post('products', product, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(response => {
  
        onCreateProduct(response.data.product);
      }).catch(error => {
        console.error(error);
      });
    };
  
    return (
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 ${isOpen ? "" : "hidden"}`}>
        <div className="fixed bg-white rounded-lg p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
          <h2 className="text-2xl font-medium mb-4 text-center">Add Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-2">
                Type
              </label>
              <input
                type="text"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Save
              </button>
              <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      
    );
  }
  