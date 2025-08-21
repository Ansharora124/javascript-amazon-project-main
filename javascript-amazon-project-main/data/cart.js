export let cart=JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart=[{
productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
quantity : 2,
deliveryOptionsId:'1'

},
{productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:1,
deliveryOptionsId:'2'
}];

}


function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}


export function addToCart(productId){
  let matchingitem;
  cart.forEach((cartitem)=>{
    if(productId===cartitem.productId){
      matchingitem=cartitem;
    }
  });
  if(matchingitem){
    matchingitem.quantity+=1;
  }else{
    cart.push({
      productId:productId,
      quantity:1,
      deliveryOptionsId:'1'
    });
  }
saveToStorage();

}

export function removeFromCart(productId){
  const newcart=[];

  cart.forEach((cartitem)=>{
    if(cartitem.productId!==productId){
      newcart.push(cartitem);
    }
  });
  cart = newcart;
  saveToStorage();
};