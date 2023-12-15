import { PaymentInfo } from "../Type/PaymentInfo";

interface CreateCheckoutResponse {}

export const createCheckout = async (body: PaymentInfo): Promise<CreateCheckoutResponse> => {
  return fetch("/api/checkout", {
    method: "post",
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export type GetPaymentsStatusResponse = Array<{
  id: string;
  status: string;
  total: number;
  items: {
    id: string;
    title: string;
    pricePerItem: number;
    quantity: number;
  }[];
}>;
export const getPaymentsStatus = async (params: { response: { id: string } }[]): Promise<GetPaymentsStatusResponse | undefined> => {
  try {
    // should use all settled in production
    const arr = params.map(({ response: { id } }) => {
      return fetch("/api/checkout?id=" + id).then((res) => res.json());
    });
    const list = (await Promise.all(arr))
      .map((res) => res.response)
      .map((detail) => ({
        id: detail.id,
        status: detail.status,
        total: detail.amount,
        items: JSON.parse(detail.metadata.data),
      }));
    return list;
  } catch (err) {
    console.error;
    throw new Error(err as any);
  }
};
