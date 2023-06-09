import { useEffect, useState } from "react";
import axios from 'axios';


export default function AddItemsModal({ productId, isOpen, onClose, handleAddItems }) {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([{ serial_number: '' }]);

  useEffect(() => { setCount(items.length); }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    axios.post(`products/${productId}/items`, { items }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      handleOnClose();
      handleAddItems();
    }).catch(error => {
      console.error(error);
    });
  };

  const handleAddMore = () => {
    const newItems = [...items];
    newItems.push({ serial_number: '' });
    setItems(newItems);
    setCount(newItems.length);
  };

  const handleOnClose = () => {
    onClose()
    setItems([{ serial_number: '' }]);
    setCount(1);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    if (updatedItems.length <= 1) {
      return;
    }
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    setCount(updatedItems.length);
  };

  const handleSerialNumberChange = (index, value) => {
    const newItems = [...items];
    newItems[index].serial_number = value;
    setItems(newItems);
  };

  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 ${isOpen ? "" : "hidden"}`}>
      <div className="fixed bg-white rounded-lg p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3">
        <h2 className="text-3xl font-medium mb-8 text-center ">Add Items</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Count:
            </label>
            <span className="pl-2" >{count}</span>
          </div>
          <div className="mb-4">
            <label htmlFor="items" className="block font-medium mb-2">
              Serial Numbers
            </label>
            {items.map((item, index) => (
              <div key={index} className="flex justify-evenly">
                <input
                  key={index}
                  type="text"
                  value={item.serial_number}
                  type="number"
                  onChange={(e) => handleSerialNumberChange(index, e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {count > 1 ? (
                  <div className="pl-2 text-2xl">
                    <button type="button" onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-700 focus:outline-none">
                      X
                    </button>
                  </div>
                ) : (<div></div>)}
              </div>
            ))}
            <button type="button" onClick={handleAddMore} className="text-blue-500 hover:text-blue-700 focus:outline-none">
              Add More
            </button>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Save
            </button>
            <button type="button" onClick={handleOnClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}
