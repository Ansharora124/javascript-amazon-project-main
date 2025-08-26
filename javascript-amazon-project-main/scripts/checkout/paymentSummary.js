import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary(){
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId) || { priceCents: 0 };
    productPriceCents += product.priceCents * (cartItem.quantity || 0);

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId) || { priceCents: 0 };
    shippingPriceCents += deliveryOption.priceCents || 0;
  });

  const subtotalCents = productPriceCents + shippingPriceCents;
  const taxCents = Math.round(subtotalCents * 0.1);
  const totalCents = subtotalCents + taxCents;

  // Update DOM values if elements exist
  const paymentSummary = document.querySelector('.payment-summary');
  if (!paymentSummary) return;

  const itemsElem = paymentSummary.querySelector('.payment-summary-row:first-of-type .payment-summary-money');
  if (itemsElem) itemsElem.textContent = `$${formatCurrency(productPriceCents)} `;

  const shippingElem = paymentSummary.querySelector('.payment-summary-row:nth-of-type(2) .payment-summary-money');
  if (shippingElem) shippingElem.textContent = `$${formatCurrency(shippingPriceCents)}`;

  const subtotalElem = paymentSummary.querySelector('.subtotal-row .payment-summary-money');
  if (subtotalElem) subtotalElem.textContent = `$${formatCurrency(subtotalCents)}`;

  const taxElem = paymentSummary.querySelector('.payment-summary-row:nth-of-type(4) .payment-summary-money');
  if (taxElem) taxElem.textContent = `$${formatCurrency(taxCents)}`;

  const totalElem = paymentSummary.querySelector('.total-row .payment-summary-money');
  if (totalElem) totalElem.textContent = `$${formatCurrency(totalCents)}`;
}