import React from "react";
import { SiSmartthings } from "react-icons/si";
import { FaTruck, FaRupeeSign } from "react-icons/fa";

function Description() {
  return (
    <>
      <section className="text-gray-600 body-font mt-24">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/3">
              <div className="flex items-center justify-center rounded-lg h-full bg-gray-100 p-4 flex-col">
                <div className="flex items-center justify-center flex-col mb-3">
                  <SiSmartthings className="text-5xl text-yellow-500 mb-2" />
                  <h2 className="text-purple-900 text-2xl title-font font-medium">
                    Premium Items
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-purple-700 text-lg">
                    Our Products are 100% Orignal and have good quality.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex items-center justify-center rounded-lg h-full bg-gray-100 p-4 flex-col">
                <div className="flex items-center justify-center flex-col mb-3">
                  <FaTruck className="text-5xl text-yellow-500 mb-2" />
                  <h2 className="text-purple-900 text-2xl title-font font-medium">
                    Free Delivery
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="eading-relaxed text-purple-700 text-lg">
                    We ship all over India for FREE.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex items-center justify-center rounded-lg h-full bg-gray-100 p-4 flex-col">
                <div className="flex items-center justify-center flex-col mb-3">
                  <FaRupeeSign className="text-5xl text-yellow-500 mb-2" />
                  <h2 className="text-purple-900 text-2xl title-font font-medium">
                    Exciting Offers
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="eading-relaxed text-purple-700 text-lg">
                    We provide amazing offers & discounts on our products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Description;
