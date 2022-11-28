import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutFromWishlist from "./CheckoutFromWishlist";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const PaymentWishlist = () => {
  const booking = useLoaderData();

  console.log(booking);
  return (
    <div>
      <h4 className="text-center">
        Complete Your Payment for purchasing{" "}
        <span className="text-danger">{booking?.productName}</span>{" "}
      </h4>
      <h4 className="text-center">
        Product Price:{" "}
        <span className="text-warning">{booking?.salePrice} Taka</span>{" "}
      </h4>
      <div className="mt-3">
        <Elements stripe={stripePromise}>
          <CheckoutFromWishlist booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentWishlist;
