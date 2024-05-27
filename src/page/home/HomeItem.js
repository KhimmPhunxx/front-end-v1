import React from 'react'
import ProductList from '../../component/list/ProductList'

export default function HomeItem(props) {
    const datItem =  [{
        id : 101,
        name : "Macbook Pro 2021",
        price : 1600,
        description : "256 SSD, 8 GB",
        image : "https://images.khmer24.co/23-08-17/465836-macbook-pro-2021-m1-pro-chip-1692288239-78166356-b.jpg",
        color : "bg-blue-300"
    },
    {
        id : 102,
        name : "Macbook Pro 2022",
        price : 1700,
        description : "512 SSD, 32 GB",
        image : "https://images.khmer24.co/23-07-29/macbook-pro-2022-m2-290063169060295058454167-d.jpg",
        color : "bg-yellow-300"
    },
    {
        id : 103,
        name : "Macbook Pro 2023",
        price : 1800,
        description : "1 TB SSD, 64 GB",
        image : "https://images.khmer24.co/23-08-17/465836-macbook-pro-2021-m1-pro-chip-1692288239-78166356-b.jpg",
        color : "bg-red-300"
    },
    {
        id : 104,
        name : "Macbook Pro 2024",
        price : 1900,
        description : "2 TB SSD, 128 GB",
        image : "https://images.khmer24.co/23-07-29/macbook-pro-2022-m2-290063169060295058454167-d.jpg",
        color : "bg-green-300"
    },
    {
        id : 105,
        name : "Macbook Pro 2025",
        price : 2000,
        description : "2 TB SSD, 256 GB",
        image : "https://images.khmer24.co/23-08-17/465836-macbook-pro-2021-m1-pro-chip-1692288239-78166356-b.jpg",
        color : "bg-blue-300"
    },
    {
        id : 106,
        name : "Macbook Pro 2026",
        price : 2100,
        description : "2 TB SSD, 512 GB",
        image : "https://images.khmer24.co/23-07-29/macbook-pro-2022-m2-290063169060295058454167-d.jpg",
        color : "bg-yellow-300"
    },
    {
        id : 107,
        name : "Macbook Pro 2027",
        price : 2200,
        description : "2 TB SSD, 1024 GB",
        image : "https://images.khmer24.co/23-08-17/465836-macbook-pro-2021-m1-pro-chip-1692288239-78166356-b.jpg",
        color : "bg-red-300"
    },
    {
        id : 108,
        name : "Macbook Pro 2028",
        price : 2300,
        description : "2 TB SSD, 2048 GB",
        image : "https://images.khmer24.co/23-07-29/macbook-pro-2022-m2-290063169060295058454167-d.jpg",
        color : "bg-green-300"
    },
    {
        id : 109,
        name : "Macbook Pro 2029",
        price : 2400,
        description : "2 TB SSD, 4096 GB",
        image : "https://images.khmer24.co/23-08-17/465836-macbook-pro-2021-m1-pro-chip-1692288239-78166356-b.jpg",
        color : "bg-blue-300"
    },
    {
        id : 110,
        name : "Macbook Pro 2030",
        price : 2500,
        description : "2 TB SSD, 8192 GB",
        image : "https://images.khmer24.co/23-07-29/macbook-pro-2022-m2-290063169060295058454167-d.jpg",
        color : "bg-yellow-300"
    },
  
]
  return (
    <section>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6 gap-4'>
            {
                datItem.map((item, index) => (
                    <div key={index} className={`p-3 bg-gray-100 rounded-md`}>
                        {/* <div className='w-[50%] mx-auto'>
                            <img src={item.image} className='w-full h-full object-cover' alt={item.name}/>
                        </div>
                        <h1>{item.name}</h1>
                        <p>{item.price}</p>
                        <p>{item.description}</p> */}
                        <ProductList
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            desc={item.description}
                        />
                        
                    </div>
                ))
            }
        </div>
    </section>
  )
}
