import React from 'react';

const TopProducts = () => {
    const products = [
        {
            name: 'Emerald Velvet',
            price: 355.9,
            sold: 917,
            image: 'https://via.placeholder.com/50x50.png?text=Emerald',
        },
        {
            name: 'Velvet Coral',
            price: 279.0,
            sold: 804,
            image: 'https://via.placeholder.com/50x50.png?text=Coral',
        },
        {
            name: 'Rotterdam',
            price: 329.95,
            sold: 738,
            image: 'https://via.placeholder.com/50x50.png?text=Rotterdam',
        },
        {
            name: 'Happy Yellow',
            price: 315.5,
            sold: 684,
            image: 'https://via.placeholder.com/50x50.png?text=Yellow',
        },
        {
            name: 'Happy Yellow',
            price: 315.5,
            sold: 684,
            image: 'https://via.placeholder.com/50x50.png?text=Yellow',
        },
        {
            name: 'Extra Product',
            price: 499.99,
            sold: 500,
            image: 'https://via.placeholder.com/50x50.png?text=Extra',
        },
    ];

    const limitedProducts = products.slice(0, 5);

    return (
        <div className="rounded-lg shadow-lg p-6 max-w-md bg-neutral">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Top products</h2>
            </div>
            <ul>
                {limitedProducts.map((product, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-100 rounded-lg mb-3"
                    >
                        <div className="flex items-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded-md mr-4"
                            />
                            <div>
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-sm text-gray-500">{product.sold} sold</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">${product.price.toFixed(2)}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopProducts;
