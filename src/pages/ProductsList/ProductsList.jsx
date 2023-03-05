import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, massDeleteProducts } from '../../api';
import Products from '../../components/Products';
import { formatResponse } from '../../utils/handleResponses';

const ProductsList = () => {
  const [products, setProducts] = useState();
  const [productsToDelete, setProductsToDelete] = useState([]);

  useEffect(() => {
    const requestProucts = async () => {
      const response = await fetchProducts();
      const data = response.map((product) => formatResponse(product));
      setProducts(data);
    };
    requestProucts();
  }, []);

  const handleDelete = (sku) => {
    const newProductsArr = [...productsToDelete, sku];
    setProductsToDelete(newProductsArr);
  };

  const massDelete = async () => {
    if (!productsToDelete.length) return;

    const { message } = await massDeleteProducts(productsToDelete);
    if (message) {
      window.location.reload();
    }
  };

  return (
    <>
      <div className="flex justify-around py-3 items-center border">
        <h1 className="text-2xl font-semibold">Product List</h1>
        <div className="flex justify-around gap-5">
          <button className="bg-gray-500 text-white px-2 py-1">
            <Link to="/add-product">ADD</Link>
          </button>
          <button
            className="bg-gray-500 text-white px-2 py-1"
            id="#delete-product-btn"
            onClick={massDelete}
          >
            MASS DELETE
          </button>
        </div>
      </div>
      <hr />
      <Products products={products} handleDelete={handleDelete} />
      <hr />
      <span>Scandiweb Test assignment</span>
    </>
  );
};

export default ProductsList;
