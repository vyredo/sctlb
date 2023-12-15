import { PaymentInfo } from "../Type/PaymentInfo";

interface CreateCheckoutResponse {}

export const createCheckout = async (body: PaymentInfo): Promise<CreateCheckoutResponse> => {
  return fetch("/api/checkout", {
    method: "post",
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const getPaymentsStatus = async (ids: string[]): Promise<Array<PaymentInfo> | undefined> => {
  try {
    // should use all settled in production
    const list = await Promise.all(
      ids.map((id: string) => {
        return fetch("/api/checkout?id=" + id).then((res) => res.json());
      })
    );

    return list;
  } catch (err) {
    console.error;
    throw new Error(err as any);
  }
};
