import React, { useEffect } from "react";
import Product from "./ProductComponents/Product";
import LoadingBox from './utilityComponents/LoadingBox'
import MessageBox from "./utilityComponents/MessageBox";

import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../redux/actions/productActions";


function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;


  // useEffect Hook
  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((p) => (
            <Product key={p._id} p={p} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

export default HomeScreen;
