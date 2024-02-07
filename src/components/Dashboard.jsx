import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/CreateContext";
import Order from "./Order";
import { OrdersService, ProductService } from "../utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  let [orders, setOrders] = useState([]);
  
  // console.log("Orders ", orders);
  let auth = useAuth();
  // console.log(auth);

  // react toastift
  const notify = () => toast("Order Purchased",{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

    const notifyDel = () => toast("Order Removed From Cart",{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  

  useEffect(() => {
    document.title = "Ecommerce Dashboard";
  }, []);

// refresh button load data from database
let loadDataFromDatabase = useCallback(
  async () => {
    let orderresponse = await fetch(
      `http://localhost:4000/orders?userId=${auth.condata?.currentUserId}`,
      { method: "GET" }
    );
    if (orderresponse.ok) {
      let orderresponseBody = await orderresponse.json();
      // console.log(responseBody);
  
      //if all orders daata are fetched then get All products
      let productResponse = await ProductService.fetchProducts()
      if (productResponse.ok) {
        let productResponseBody = await productResponse.json();
        // console.log("productresponeBody ", productResponseBody);
  
        //  merging product with respective order productid
        orderresponseBody.forEach((order) => {
          order.product = ProductService.getProductByProductId(
            productResponseBody,
            order.productId
          )
        });
        setOrders(orderresponseBody);
      }else{

      }
    }
  },[auth.condata.currentUserId]
)

  useEffect(() => {
    // load data from datatbase
loadDataFromDatabase()
    
  }, [useAuth.condata?.currentUserId,loadDataFromDatabase]);

// onbuy click
let onBuyClick = useCallback(
  async(orderId,userId,productId,quantity) => {
    if(window.confirm('Do you want to Place Order')){
      let updateOrder = {
        id:orderId,
        productId:productId,
        userId:userId,
        quantity:quantity,
        isPaymentCompleted:true
      }
    
    let orderBuyResponse = await fetch(`http://localhost:4000/orders/${orderId}`,
    {method: 'PUT',body:JSON.stringify(updateOrder),headers:{
      "Content-type":"application/json"
    }}
    )
    
    let orderBuyResponseBody = await orderBuyResponse.json()
    if(orderBuyResponse.ok){
      // console.log(orderBuyResponseBody);
      loadDataFromDatabase()
    notify()
    }
    
    }
    },[loadDataFromDatabase])

    // ondelete button

    let onDeleteClick = useCallback(async(orderId)=>{
      if(window.confirm('Do you want to remove the item ?')){
        let orderResponse = await fetch(`http://localhost:4000/orders/${orderId}`,{method: "DELETE"})
        if(orderResponse.ok){
          let orderReponseBody= await orderResponse.json()
          console.log(orderReponseBody);
          notifyDel()
          loadDataFromDatabase()
        } 
      }
    },[loadDataFromDatabase])

  return (
    <div>
      <div className="row">
        <div className="header text-bg-secondary border py-2 col-12">
          <h1>
            <i class="fa-solid fa-store mx-3"></i>
            DashBoard
           <button onClick={loadDataFromDatabase} className="ms-2 btn btn-lg btn-info">
           <i class="fa-solid fa-arrows-rotate  text-warning"></i>
           Refresh
           </button>
          </h1>
        </div>
        <div className="row gap-2">
          {/* prev order starts */}
          <div className="col-md-5 offset-1  py-3 my-2">
            <h3 className="text-center border-bottom border-4 border-success py-3 my-2">
              <i class="fa-regular fa-clock"></i>
              Get Previous Order
              <span class=" ms-2 badge bg-secondary">
                {OrdersService.getprevOrders(orders).length}
              </span>
            </h3>

            {OrdersService.getprevOrders(orders).length == 0 ? (
              <h2 className="text-danger text-center">No Previous Orders</h2>
            ) : (
              ""
            )}

            {OrdersService.getprevOrders(orders).map((ord, index) => (
              <Order 
              key={index} 
              orderId={ord.id}
              productId={ord.productId} 
              userId={ord.userId}
              isPaymentCompleted={ord.isPaymentCompleted}
              quantity={ord.quantity}
              price={ord.product.price}
              productName={ord.product.productName}
              onBuyClick={onBuyClick}
              onDeleteClick={onDeleteClick}
              // notify={notify}
              />
            ))}
          </div>

          {/* prev order ends */}
          {/* get cart starts */}
          <div className="col-md-5 py-3">
            <h3 className="text-center border-bottom border-4 border-success py-3 my-2">
              <i class="fa-solid fa-cart-plus"></i> My Cart
              <span class=" ms-2 badge bg-secondary">
                {OrdersService.getCart(orders).length}
              </span>
            </h3>
            {OrdersService.getCart(orders).length == 0 ? (
              <h2 className="text-danger text-center">Cart is empty</h2>
            ) : (
              ""
            )}

         

{OrdersService.getCart(orders).map((ord, index) => (
              <Order 
              key={index} 
              orderId={ord.id}
              productId={ord.productId} 
              userId={ord.userId}
              isPaymentCompleted={ord.isPaymentCompleted}
              quantity={ord.quantity}
              price={ord.product.price}
              productName={ord.product.productName}
              onBuyClick={onBuyClick}
              onDeleteClick={onDeleteClick}
              // notify={notify}
              />
            ))}

          </div>
          {/* get cart ends */}
        </div>
      </div>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </div>
  );
}

export default Dashboard;
