import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import displayUSDCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import Context from "../context";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingCart = new Array(4).fill(null)
  const context = useContext(Context)

  const fetchData = async() =>{
    setLoading(true)
    const response = await fetch(SummaryApi.addToCartProductView.url,{
        method : SummaryApi.addToCartProductView.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
    })
   

    setLoading(false)

    const responseData = await response.json()

    if(responseData.success){
        setData(responseData.data)
    }  
}



useEffect(() => {
    fetchData()
  }, []);

  //tăng số lượng
  const increaseQty = async(id,qty) =>{
    const response = await fetch(SummaryApi.updateCartProduct.url,{
        method : SummaryApi.updateCartProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            {   
                _id : id,
                quantity : qty + 1
            }
        )
    })

    const responseData = await response.json()


    if(responseData.success){
        fetchData()
    }
}


//giảm số lượng
const decraseQty = async(id,qty) =>{
    if(qty >= 2){
         const response = await fetch(SummaryApi.updateCartProduct.url,{
             method : SummaryApi.updateCartProduct.method,
             credentials : 'include',
             headers : {
                 "content-type" : 'application/json'
             },
             body : JSON.stringify(
                 {   
                     _id : id,
                     quantity : qty - 1
                 }
             )
         })

         const responseData = await response.json()


         if(responseData.success){
             fetchData()
         }
     }
 }

 const deleteCartProduct = async(id)=>{
    const response = await fetch(SummaryApi.deleteCartProduct.url,{
        method : SummaryApi.deleteCartProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            {   
                _id : id,
            }
        )
    })

    const responseData = await response.json()

    if(responseData.success){
        fetchData()
        context.fetchUserAddToCart()
    }
}

console.log("cart-data",data)

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>   
                {/***view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el,index) => {
                                return(
                                    <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })
                             
                        ) : (
                          data.map((product,index)=>{
                           return(
                            <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                </div>
                                <div className='px-4 py-2 relative'>
                                    {/**delete product */}
                                    <div className='absolute right-0 text-blue-600 rounded-full p-2 hover:bg-blue-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                        <MdDelete/>
                                    </div>

                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                    <div className='flex items-center justify-between'>
                                            <p className='text-blue-600 font-medium text-lg'>{displayUSDCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayUSDCurrency(product?.productId?.sellingPrice  * product?.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-6 h-6 flex justify-center items-center rounded '  onClick={()=>decraseQty(product?._id,product?.quantity)}>-</button>
                                        <span>{product?.quantity}</span>
                                        <button className='border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-6 h-6 flex justify-center items-center rounded '  onClick={()=>increaseQty(product?._id,product?.quantity)} >+</button>
                                    </div>
                                </div>    
                            </div>
                           )
                          })
                        )
                    }
                </div>


                {/***summary  */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                
                            </div>
                            ) : (
                                <div className='h-36 bg-white'>
                                    <h2 className='text-white bg-blue-600 px-4 py-1'>Summary</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity</p>
                                        <p>{}</p>
                                    </div>

                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price</p>
                                        <p>{displayUSDCurrency()}</p>    
                                    </div>

                                    <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>

                                </div>
                            )
                        }
                </div>
        </div>




    </div>



  );
};

export default Cart;