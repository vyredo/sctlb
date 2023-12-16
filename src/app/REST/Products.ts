import { Product } from "../Type/Product";
const chairImages = [
  "https://images.secretlab.co/turntable/tr:n-w_1500/R22PU-Stealth",
  "https://images.secretlab.co/turntable/tr:n-w_1500/R22SW-CnC",
  "https://images.secretlab.co/turntable/tr:n-w_1500/R22SW-Blk3",
  "https://images.secretlab.co/turntable/tr:n-w_1500/R22PU-Ash",
  "https://images.secretlab.co/turntable/tr:n-w_1500/R22PU-Batman",
];

// use class to define default value
class GetProductRequest {
  skip: number = 0;
  limit: number = 10;
}

interface GetProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
export const getProducts = async (opt = new GetProductRequest()): Promise<GetProductResponse> => {
  try {
    const { skip, limit } = opt;
    const {
      response: { products },
    } = (await fetch(`/api/products?limit=${limit}&skip=${skip}`).then((res) => res.json())) as {
      response: {
        products: Product[];
      };
    };
    // adding imagesTurntable for turntable animation
    for (let i = 1; i <= 12; i++) {
      products.forEach((p) => {
        if (!p["imagesTurntable"]) {
          p["imagesTurntable"] = [];
        }
        // pad 0 to the left of i
        const num = i.toString().padStart(2, "0");
        const randomTurntableImage = chairImages[Math.floor(Math.random() * chairImages.length)];
        p["imagesTurntable"].push(`${randomTurntableImage}_${num}.jpg`);
      });
    }

    return {
      products,
      total: products.length,
      skip,
      limit,
    } as GetProductResponse;
  } catch (error) {
    console.log(error);
    throw new Error(error as any);
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const _id = parseInt(id);
    if (isNaN(_id)) {
      throw new Error("Invalid id");
    }
    const result = (await fetch(`/api/products/${id}`).then((res) => res.json())) as {
      response: Product;
    };

    console.log("what is result", result);
    const product = result.response;

    if (!product) {
      throw new Error("Product not found");
    }

    if (!product.imagesTurntable) {
      product.imagesTurntable = [];
    }

    if (product.imagesTurntable.length === 0) {
      // adding imagesTurntable for turntable animation
      for (let i = 1; i <= 12; i++) {
        // override type of products to become Product[]

        // pad 0 to the left of i
        const num = i.toString().padStart(2, "0");
        const randomTurntableImage = chairImages[Math.floor(Math.random() * chairImages.length)];
        (product as Product)["imagesTurntable"].push(`${randomTurntableImage}_${num}.jpg`);
      }
    }

    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};
