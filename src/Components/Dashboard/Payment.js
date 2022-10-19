import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Loading from "../Shared/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Firebase/Firebase.init";
import Navbar from "../Shared/Navbar";

const stripePromise = loadStripe(
  "pk_test_51L4fzAB4WYmpQRJkrlqBLtG4kegFippsYXIR8Y9ueD7p1htdcxx20iWMT6ABOwc2Dci8QTY6iCd93EfX0A9y0XlQ00wosJ9Fcj"
);
const Payment = () => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);

  const [user] = useAuthState(auth);

  const { paymentId } = useParams();

  const { price, name, email, orderQuantity, productName } = order;
  console.log(price);

  useEffect(() => {
    fetch(
      `https://fathomless-coast-84439.herokuapp.com/paymentOrder/${paymentId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        setOrder(data);
      });
  }, [paymentId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="pt-20 w-50 sm:w-96 mx-10 ">
          <div className="py-3 my-2 bg-gray-100 w-full p-5">
            <h1>{user.displayName}</h1>
          </div>
          <div className="py-3 my-2 bg-gray-100 w-full p-5">
            <h1>{user.email}</h1>
          </div>
          <div className="py-3 my-2 bg-gray-100 w-full p-5">
            <h1>{name}</h1>
          </div>
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm order={order} setLoading={setLoading} />
            </Elements>
            <p className="py-2 text-accent">
              Click{" "}
              <a
                target="_blank"
                className="text-blue-500"
                href="https://stripe.com/docs/testing"
              >
                here
              </a>{" "}
              to get some test numbers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
