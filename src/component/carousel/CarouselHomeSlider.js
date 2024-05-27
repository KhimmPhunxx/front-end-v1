import React from 'react'
import { Carousel } from 'antd';

export default function CarouselHomeSlider() {

    const carouselSlie =  [{
            id : 101,
            title : "Macbook Pro 2021",
            sub_title : 1600,
            description : "256 SSD, 8 GB",
            image : "https://images.khmer24.co/23-08-17/465836-macbook-pro-2021-m1-pro-chip-1692288239-78166356-b.jpg",
            color : "bg-blue-500"
        },
        {
            id : 102,
            title : "Macbook Pro 2022",
            sub_title : 1700,
            description : "512 SSD, 32 GB",
            image : "https://images.khmer24.co/23-07-29/macbook-pro-2022-m2-290063169060295058454167-d.jpg",
            color : "bg-yellow-300"
        },
        {
            id : 103,
            title : "Macbook Pro 2023",
            sub_title : 1800,
            description : "1 TB SSD, 64 GB",
            image : "https://images.khmer24.co/23-08-17/465836-macbook-pro-2021-m1-pro-chip-1692288239-78166356-b.jpg",
            color : "bg-red-300"
        },
        {
            id : 104,
            title : "Macbook Pro 2024",
            sub_title : 1900,
            description : "2 TB SSD, 128 GB",
            image : "https://images.khmer24.co/23-07-29/macbook-pro-2022-m2-290063169060295058454167-d.jpg",
            color : "bg-green-300"
        }
      
    ]
  return (
    <Carousel autoplay autoplaySpeed={2000}>
        
        {
            carouselSlie.map((item, index) => (
                <div key={index} className={`${item.color} h-[500px]`}>
                    <div className='w-[100%] h-full'>
                        <img src={item.image} className='w-full h-full object-cover' alt={item.title}/>
                    </div>
                    <h1>{item.title}</h1>
                    <p>{item.sub_title}</p>
                    <p>{item.description}</p>
                    
                </div>
            ))
        }
    </Carousel>
  )
}
