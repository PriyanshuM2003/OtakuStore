import React, { useEffect, useState } from 'react';

function Carousel() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasLoadedImages, setHasLoadedImages] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []);


    useEffect(() => {
        if (hasLoadedImages && !localStorage.getItem('refreshed')) {
            localStorage.setItem('refreshed', true);
            window.location.reload();
        }
    }, [hasLoadedImages]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [images.length]);

    const fetchImages = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getimages`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setImages(data);
                setIsLoading(false);
                setHasLoadedImages(true);
            } else {
                console.error("Error fetching images");
                setIsLoading(false);
            }
        } catch (error) {
            setError("Error fetching images: " + error.message);
            setIsLoading(false);
        }
    };

    const filterImagesByCategory = (category) => {
        return images.filter((image) => image.category === category);
    };

    const categoryHrefs = {
        'T-Shirt': '/tshirts',
        'Action Figure': '/actionfigs',
        'Costume': '/costumes',
        'Replica': '/replicas',
        'Pillow': '/pillows',
        'Bedsheet': '/bedsheets',
        'Sticker': '/stickers',
        'Poster': '/posters',
    };

    return (
        <>
            <section>
                <div className='grid grid-cols-2 md:grid-cols-4 rounded border-2 border-purple-900'>
                    {['T-Shirt', 'Action Figure', 'Costume', 'Replica', 'Pillow', 'Bedsheet', 'Sticker', 'Poster'].map((category) => (
                        <a key={category} href={categoryHrefs[category]}>
                            <div className='flex justify-center items-center flex-col bg-white overflow-hidden border-2 border-gray-300'>
                                {isLoading ? (
                                    <div className='animate-pulse w-auto h-72 px-2 mt-2 bg-gray-300'></div>
                                ) : error ? (
                                    <div>Error fetching images</div>
                                ) : (<>
                                    <img
                                        className='w-auto h-72 px-2 mt-2 object-cover object-center'
                                        src={filterImagesByCategory(category)[currentIndex % filterImagesByCategory(category).length]?.img || ''}
                                        alt={filterImagesByCategory(category)[currentIndex % filterImagesByCategory(category).length]?.category || ''}
                                    />
                                    <div className='px-6 py-4'>
                                        {filterImagesByCategory(category)[currentIndex % filterImagesByCategory(category).length] && (
                                            <div className='font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-b from-purple-900 to-pink-800'>
                                                {filterImagesByCategory(category)[currentIndex % filterImagesByCategory(category).length].category}
                                            </div>
                                        )}
                                    </div>
                                </>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Carousel;
