import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Rating from "./Rating";
import { useSelector, useDispatch } from "react-redux";
import LoadingBox from "../utilityComponents/LoadingBox";
import MessageBox from "../utilityComponents/MessageBox";
import { detailsProduct } from "../../redux/actions/productActions";

function ProductScreen(props) {
  const dispatch = useDispatch();
  
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  
  const productDetails = useSelector((state) => state.productDetails);
  const { product, error, loading } = productDetails;


  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = (e)=>{

    props.history.push(`/cart/${productId}?qty=${qty}`)

  }

  return (
    <React.Fragment>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>Pirce : ${product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="error">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {
                    product.countInStock > 0 && (
                     <React.Fragment>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div> <select value={qty} onChange={(e)=> setQty(e.target.value)}>
                            {
                              [...Array(product.countInStock).keys()].map(q => (
                                <option key={q+1} value={q+1}>{q+1}</option>
                              ))
                            }
                          </select></div>
                        </div>
                      </li>
                     
                      <li>
                        <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                      </li>
                     </React.Fragment>
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default ProductScreen;
