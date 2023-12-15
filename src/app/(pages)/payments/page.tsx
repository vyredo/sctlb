"use client";

import { LayoutPage } from "@/app/shared_components/LayoutPage/LayoutPage";
import React, { useEffect, useState } from "react";
import { GetPaymentsStatusResponse, getPaymentsStatus } from "@/app/REST/Checkout";

import "./payments.scss";

export default function Payments() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<GetPaymentsStatusResponse>([]);

  useEffect(() => {
    async function onmount() {
      const paymentListStr = localStorage.getItem("paymentList") as string;
      if (!paymentListStr) {
        localStorage.setItem("paymentList", "[]");
      }
      setLoading(true);
      const paymentList = JSON.parse(paymentListStr);
      const list = await getPaymentsStatus(paymentList);
      if (Array.isArray(list)) {
        setList(list);
      }
      setLoading(false);
    }
    onmount();
  }, []);

  return (
    <LayoutPage className="payments" seotitle={"payments"} loading={loading}>
      <h1>Payments</h1>
      <div>All Payments for all user will be shown here</div>

      {list.map((l, index) => {
        return (
          <div key={index} className="row">
            {l.items.map((i, idx) => {
              return (
                <ul key={i.id + idx} className="items">
                  <li>{i.title}</li>
                  <li>{i.quantity}</li>
                  <li>{i.pricePerItem}</li>
                </ul>
              );
            })}

            <div className="totalPrice">
              <label>Total</label>
              <span>${l.total / 100}</span>
            </div>
          </div>
        );
      })}
    </LayoutPage>
  );
}
