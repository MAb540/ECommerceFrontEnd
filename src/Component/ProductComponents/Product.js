import React from 'react'
import Rating from './Rating';
import {Link} from 'react-router-dom';

function Product(props) {
    const {p} = props;
    return (
        <div key={p._id} className="card">
              <Link to={'/product/'+p._id}>
                <img className="medium" alt={p.name} src={p.image} />
              </Link>
              <div className="card-body">
                <Link to={`/product/${p._id}`}>
                  <h2>{p.name}</h2>
                </Link>
                 <Rating  rating={p.rating} numReviews={p.numReviews}/>
                  <div className="price">{p.price}</div>
                </div>
            </div>

    )
}

export default Product
