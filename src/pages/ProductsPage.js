import { Fragment } from "react";
import Navbar from "../layouts/Navbar";
import axios from 'axios';
import { useState, useEffect } from "react";
import AddProductModal from "../components/AddProductModal";
import { useNavigate } from 'react-router-dom';
import EditProductModal from "../components/EditProductModal";


const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [seletectedProduct, setSeletectedProduct] = useState(null);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => { getProducts(); }, []);


  const getProducts = async () => {
    axios.defaults.baseURL = "http://inventory.test/api/";

    await axios.get('products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => {
      setProducts(response.data.products);
    }).catch(error => {

      if(error.response.status === 401) {
          navigate('/', { replace: true });            
      }
    });
  }

  const handleSearchEvent = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredProducts = products.filter((product) =>
    product.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleRemoveProduct = (e, product) => {
    e.stopPropagation();
    axios.delete(`products/${product.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      getProducts();
    }).catch(error => {
      console.error(error);
    });
  };
  const handleAddProduct = () => {
    setShowAddProduct(true);
  };


  const handleEditProduct = (e, product) => {
    e.stopPropagation();
    setSeletectedProduct(product);
  };

  const handleCloseAddProduct = () => {
    setShowAddProduct(false);
  };

  const handleCloseEditProduct = () => {
    setSeletectedProduct(null);
  };

  const handleCreateProduct = (product) => {
    setProducts([...products, product]);
    setShowAddProduct(false);
  };

  const handleProductEdited = () => {
    getProducts();
    handleCloseEditProduct();
  };

  const openItemsPage = (product) => {
    navigate(`/products/${product.id}/items`, { product: product });
  };


  return (
    <Fragment>

      <Navbar />
      <AddProductModal
        isOpen={showAddProduct}
        onClose={handleCloseAddProduct}
        onCreateProduct={handleCreateProduct}
      />
         {seletectedProduct ? (<EditProductModal
         product={seletectedProduct}
        onClose={handleCloseEditProduct}
        onEditProduct={handleProductEdited}
      />) : ( <div></div>)}
      <div className="flex justify-center pt-6">
        <div className="flex flex-col w-4/6 ">
          <h3>Products</h3>

          <div className=" mt-3 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <div className="flex justify-between mb-4 p-2">
                  <div className="flex items-center">
                    <label htmlFor="search" className="mr-2">
                      Search:
                    </label>
                    <input
                      type="text"
                      id="search"
                      placeholder="Search products..."
                      onChange={handleSearchEvent}
                      className="py-1 px-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    className="py-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => handleAddProduct()}
                  >
                    Add Product
                  </button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Id
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Available Items
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map(product => (
                      <tr key={product.id} onClick={() => openItemsPage(product)} className="hover:bg-slate-100">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-100 text-green-800"
                            >
                              {product.count}
                            </span>
                          </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a onClick={(e) => handleEditProduct(e, product)} className="text-blue-500 hover:text-blue-900 cursor-pointer">
                            Edit
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a onClick={(e) => handleRemoveProduct(e, product)} className="text-red-500 hover:text-red-900 cursor-pointer">
                            Remove
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>


    </Fragment>

  );
};

export default ProductsPage;
