import {cart,removeFromCart} from '../data/cart.js'
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/deliveryOption.js';




let finalHtml='';


cart.forEach((cartitem)=>{

const productId=cartitem.productId;

let matchingitem;
products.forEach((product)=>{

    if(product.id===productId){
        matchingitem=product;
    }

});
const deliveryOptionsId=cartitem.deliveryOptionsId;
let deliveryOption;
deliveryOptions.forEach((option)=>{
  if(option.id===deliveryOptionsId){
deliveryOption=option;
  }
});
const today=dayjs();
const deliveryDate=today.add(deliveryOptions.deliveryDays,'days');


const dateString=deliveryDate.format('dddd, MMMM D' );


  finalHtml += `
        <div class="cart-item-container js-cart-item-container-${matchingitem.id}">
                  <div class="delivery-date">
                    Delivery date: ${dateString}
                  </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingitem.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingitem.name}
                    </div>
                    <div class="product-price">
                      $${formatCurrency(matchingitem.priceCents)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingitem.id}">
                        
                      Delete
                      </span>
                    </div>
                  </div>
              ${deliveryOptionsHtml(matchingitem, cartitem)}
                  </div>
                </div>
              </div>
        `;

});

function deliveryOptionsHtml(matchingItem, cartitem){
let html='';


  deliveryOptions.forEach((deliveryOption)=>{

  const today=dayjs();
const deliveryDate=today.add(deliveryOption.deliveryDays,'days');


const dateString=deliveryDate.format('dddd, MMMM D' );

const priceString=deliveryOption.priceCents
===0
? 'FREE'
:  `$${formatCurrency(deliveryOption.priceCents)}`

const isChecked = cartitem&&deliveryOption.id === cartitem.deliveryOptionsId;


html +=` <div class="delivery-option">
   <input type="radio"
   ${isChecked ? 'checked' : ''}
   class="delivery-option-input"
 name="delivery-option-${matchingItem.id}">
           <div>
           <div class="delivery-option-date">
            ${dateString}
                    </div>
             <div class="delivery-option-price">
                ${priceString} - Shipping
                          </div>
                        </div>
                      </div>`
      });
      
  html += '</div>';
  return html;
};




document.querySelector('.js-order-summary').innerHTML=finalHtml;     
document.querySelectorAll('.js-delete-link').
forEach((link)=>{
    link.addEventListener('click',()=>{
       const productId=link.dataset.productId;
       removeFromCart(productId);
   const container=document.querySelector(`.js-cart-item-container-${productId}`); 
   console.log(container);   
   if (container) {
     container.remove();
   }

});
});

