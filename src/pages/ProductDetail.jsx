import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProduct = async (id) => {
    try {
      const response = await fetch(
        `http://ccmm_react_ecommerce_backend.test/api/products/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      // console.log(data.product);
      setProduct(data.product);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="xl:px-32 sm:px-5 px-2">
        <div className="mt-10 flex md:flex-row flex-col xl:gap-10 gap-5">
          {/* Product Images */}
          <div className="lg:basis-[65%] md:basis-[60%] overflow-hidden">
            <div className="flex lg:flex-row flex-col-reverse gap-5">
              <div className="basis-[10%] flex lg:flex-col flex-row gap-4">
                <div className="w-full h-auto rounded-lg overflow-hidden group cursor-pointer">
                  <img
                    className="w-full h-full group-hover:scale-[1.1] transition-all"
                    src="https://cdn.prod.website-files.com/62f51a90d298e65b94bbffcd/62f6a67c4666f047ada3ba87_image-10-shop-product-shopwave-template-p-500.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="basis-[90%]">
                <div className="w-full h-auto cursor-pointer group rounded-xl overflow-hidden">
                  <img
                    className="w-full h-full group-hover:scale-[1.1] transition-all duration-200"
                    src="https://cdn.prod.website-files.com/62f51a90d298e65b94bbffcd/62f6a67c4666f047ada3ba87_image-10-shop-product-shopwave-template-p-500.png"
                    alt="Main Product"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:basis-[35%] md:basis-[40%]">
            <div className="border-[1px] border-black/10 rounded-xl py-6 px-6">
              <h1 className="text-2xl mt-3 font-medium">{product.name}</h1>
              <p className="mt-2 text-[16px] mb-5 text-black/70">
                {product.description}
              </p>
              <p className="font-bold text-2xl">{product.price} MMK</p>

              <div className="my-8 h-[1px] w-full bg-black/20"></div>
              <p className="font-semibold text-lg">Product Information</p>
              <div className="flex flex-col gap-2 mt-3">
                <div className="flex items-center">
                  <p className="basis-[35%] font-semibold">Category:</p>
                  <p className="basis-[65%] text-black/70">
                    {product.category.name}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="basis-[35%] font-semibold">Stock:</p>
                  <p className="basis-[65%] text-black/70">Product Stock</p>
                </div>
              </div>

              <div className="mt-8">
                <label className="font-bold mb-2" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  id="quantity"
                  className="w-full border-black/10 border-2 rounded-full py-3 pl-5"
                  type="number"
                  min="1"
                  defaultValue="1"
                />
              </div>
              <button className="w-full mt-4 text-white bg-primary rounded-full py-4 font-bold">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div class="w-full my-16"></div>
      </div>
    </>
  );
}

export default ProductDetail;
