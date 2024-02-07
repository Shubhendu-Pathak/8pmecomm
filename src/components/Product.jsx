import React, { useState } from "react";

function Product(props) {
  let [prod] = useState(props.product);
  let {onAddToClick} = props
  // let {prod} = props.product
// console.log(prod);
  return (
    <div
      className="card p-4 bg-warning"
      style={{ width: "350px", margin: "10px" }}
    >
      <h5>
        {" "}
        <i class="fa-solid fa-arrow-right"></i> {prod.productName}
      </h5>

      <h2 className="text-info">
        <address>${prod.price.toFixed(2)}</address>
      </h2>

      <div className="my d-flex justify-content-evenly text-primary">
        <h6>#{prod?.category?.categoryName} </h6>
        <h6> #{prod?.brand?.brandName}</h6>
      </div>
       
       <div className="container">
        {
          [...Array(prod.rating).keys()].map((n,index)=>{
            return <i class="fa-solid fa-star " key={index}></i>
          })
        }
         {
          [...Array(5-prod.rating).keys()].map((n,index)=>{
            return <i class="fa-regular fa-star" key={index}></i>
          })
        }
       </div>

       {/* button */}

       <div className="ms-auto">
       {
          prod.isOrdered ? (
            <p className="text-success fw-bolder">Added To Cart !</p>
          ) : (
            <button onClick={()=>onAddToClick(prod)} className="btn btn-info">Add To Cart</button>
          )
        }
       </div>

    </div>
  );
}

export default Product;
