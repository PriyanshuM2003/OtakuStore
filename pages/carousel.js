import Link from "next/link";
import React, { useEffect, useState } from "react";

function Carousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  const fetchImages = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getimages`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setImages(data);
    } else {
      console.error("Error fetching images");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const filterImagesByCategory = (category) => {
    return images.filter((image) => image.category === category);
  };

  const categoryHrefs = {
    "T-Shirt": "/tshirts",
    "Action Figure": "/actionfigs",
    Costume: "/costumes",
    Replica: "/replicas",
    Pillow: "/pillows",
    Bedsheet: "/bedsheets",
    Sticker: "/stickers",
    Poster: "/posters",
  };

  return (
    <>
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 rounded border-2 border-purple-900">
          {[
            "T-Shirt",
            "Action Figure",
            "Costume",
            "Replica",
            "Pillow",
            "Bedsheet",
            "Sticker",
            "Poster",
          ].map((category) => (
            <Link key={category} href={categoryHrefs[category]} legacyBehavior>
              <div className="flex cursor-pointer justify-center items-center flex-col bg-white overflow-hidden border-2 border-gray-300">
                <img
                  className="w-auto h-72 px-2 mt-2 object-cover object-center"
                  src={
                    filterImagesByCategory(category)[
                      currentIndex % filterImagesByCategory(category).length
                    ]?.img || ""
                  }
                  alt={
                    filterImagesByCategory(category)[
                      currentIndex % filterImagesByCategory(category).length
                    ]?.category || ""
                  }
                />
                <div className="px-6 py-4">
                  {filterImagesByCategory(category)[
                    currentIndex % filterImagesByCategory(category).length
                  ] && (
                    <div className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-b from-purple-900 to-pink-800">
                      {
                        filterImagesByCategory(category)[
                          currentIndex % filterImagesByCategory(category).length
                        ].category
                      }
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Carousel;
