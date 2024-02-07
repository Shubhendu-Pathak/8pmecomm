import React, { useEffect, useState } from "react";
import { useAuth } from "../context/CreateContext";
import { BrandService, CategoriesService, ProductService } from "../utils";
import Product from "./Product";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Store() {
  let [brands, setbrands] = useState([]);
  let [categories, setcategories] = useState([]);
  let [products, setProducts] = useState([]);
  let [productToShow,setProductToShow] = useState([])
  let [ search, setSearch] = useState("")

  // react toatify
let itemAdded = ()=> toast.success('🦄 Added To Cart!', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  });


  // console.log(products);
  // console.log(brands);
  // console.log(categories);

  let auth = useAuth();
  // console.log(auth);

  useEffect(() => {
    (async () => {
      // get brand from db
      let brandresponse = await BrandService.fetchBrands();
      let brandsResponseBody = await brandresponse.json();
      // console.log(brandsResponseBody);
      brandsResponseBody.forEach((brand) => {
        brand.isChecked = true;
      });
      setbrands(brandsResponseBody);

      // get categories from db
      let categoriesresponse = await CategoriesService.fetchCategories();
      let categoriesResponseBody = await categoriesresponse.json();
      // console.log(categoriesResponseBody);
      categoriesResponseBody.forEach((category) => {
        category.isChecked = true;
      });
      setcategories(categoriesResponseBody);

      // get products
      let productResponse = await fetch(`http://localhost:4000/products?productName_like=${search}`);
      let productResponseBody = await productResponse.json();

      if (productResponse.ok) {
        productResponseBody.forEach((product) => {
          // set brand
          product.brand = brandsResponseBody.find((brand) => {
            return brand.id === product.brandId;
          });

          // set category
          product.category = categoriesResponseBody.find((category) => {
            return category.id === product.categoryId;
          });

          product.isOrdered = false;
        });
        setProducts(productResponseBody);
        setProductToShow(productResponseBody)
        document.title='Ecommerce Store'
      }
    })();
  }, [search]);

  let updateBrandsCheck = (id) => {
    let brandsData = brands.map((brd) => {
      if (brd.id === id) {
        brd.isChecked = !brd.isChecked;
      }
      return brd;
    });
    setbrands(brandsData);
    updateProductsToShow()
  };

  // for filtering products to show
  let updateCategoryCheck = (id) => {
    let categoryData = categories.map((cat) => {
      if (cat.id === id) {
        cat.isChecked = !cat.isChecked;
      }
      return cat;
    });
    setcategories(categoryData);
    updateProductsToShow()
  };


  // update product to show on check

  let updateProductsToShow =()=>{
setProductToShow(
  products
  .filter((prod)=>{
    return categories.filter((category)=>{
return (
  category.id === prod.categoryId && category.isChecked===true
)
    }).length > 0
  })
  .filter((prod)=>{
    return brands.filter((brand)=>{
      return (
        brand.id === prod.brandId && brand.isChecked===true
      )
    }).length > 0
  })
)
  }

// add to cart button for each store product

let onAddToClick = (prod) => {
// alert(5656)

(async()=>{
  let newOrder = {
    productId: prod.id,
    userId: auth.condata.currentUserId,
    quantity: 1,
    isPaymentCompleted: false
  }

let orderResponse = await fetch(`http://localhost:4000/orders`,{
  method:'POST',
  body:JSON.stringify(newOrder),
  headers:{'Content-Type':"application/json"}
})

if(orderResponse.ok){
  let orderresponsebody = await orderResponse.json()

  setProducts(
    (products)=>{
      let currProd = products.find(p=>p.id==prod.id)
      currProd.isOrdered=true
      return products
    }
  )
itemAdded()
}

})()

}

  return (
    <div className="container-fluid">
      <div className="header text-bg-secondary p-3 my-4 d-flex gap-2 align-items-center">
        <h4 className="mt-2">
          <i class="fa-solid fa-box-open"></i> STORE
        </h4>
        <input type="text" className="form-control" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </div>

      <div className="row container g-1">
        {/* checkbox section */}
        <div className="col-md-2 col-sm-12 border border-success">
          <h3>Brands</h3>
          <hr />
          {brands.map((brand) => (
            <div class="form-check my-3" key={brand.id}>
              <input
                class="form-check-input"
                type="checkbox"
                value="true"
                id="flexCheckChecked"
                checked={brand.isChecked}
                onChange={() => updateBrandsCheck(brand.id)}
              />
              <label class="form-check-label" for="flexCheckChecked">
                {brand.brandName}
              </label>
            </div>
          ))}
          {/* render category checkbox */}
          <h3>Categories</h3>
          <hr />

          {categories.map((category) => (
            <div class="form-check my-3" key={category.id}>
              <input
                class="form-check-input"
                type="checkbox"
                value="true"
                id="flexCheckChecked"
                checked={category.isChecked}
                onChange={() => updateCategoryCheck(category.id)}
              />
              <label class="form-check-label" for="flexCheckChecked">
                {category.categoryName}
              </label>
            </div>
          ))}
        </div>
        {/* checkbox section */}

        {/* products */}
        <div className="col-md-9 col-sm-12 border border-primary">
          {/* {JSON.stringify(brands)} */}
          {/* {JSON.stringify(categories)} */}
          {/* {JSON.stringify(categories)}
  {JSON.stringify(products)} */}

          <div className="d-flex flex-wrap justify-content-evenly">
            {productToShow.map((prod) => (
              <Product key={prod.id} 
              product={prod} 
              onAddToClick={onAddToClick} />
            ))}
          </div>
        </div>
      </div>
      {/* products */}

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
theme="colored"
/>
    </div>
  );
}

export default Store;
