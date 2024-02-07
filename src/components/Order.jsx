import React from 'react'

function Order(props) {
    let { productId,userId, isPaymentCompleted, quantity,price, productName,onBuyClick,orderId,notify
    ,onDeleteClick} = props
// console.log('Order Component');
  return (
 <div className="card py-3 shadow-lg m-3 w-75">
    <div className="card-body">
        <h5> 
            <i class="fa-brands fa-buy-n-large"></i> {productName}
        {
            isPaymentCompleted ===false ? 
            <div className="m-3">
                <button 
                onClick={()=>{
                    onBuyClick(orderId,userId,productId,quantity)
                    // notify()
                }}
                className="btn btn-success me-2">Buy </button>
                <button className="btn btn-danger"
                onClick={()=>{
                    onDeleteClick(orderId)
                }}
                >Remove </button>
            </div> : ''
        }
        </h5>

<table className='table table-sm table-borderless m-2'>
  <tbody>
  <tr>
        <td>
        <i class="fa-solid fa-bag-shopping"></i>
            Quantity = {quantity}</td>
    </tr>
    <tr>
        <td> 
        <i class="fa-solid fa-tag"></i>
            Price = ${price}</td>
    </tr>
  </tbody>

</table>

    </div>

 </div>
  )
}

export default React.memo(Order)