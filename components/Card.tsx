import React from 'react'
import Image from 'next/image'
import { ProductProps } from '@/types'


const Card = ({ key, name, img, price, product_category }: ProductProps) => {
  return (
    <div className="card__container">
      <Image
        src={`/${img}`}
        alt={`image ${key}`}
        width={384}
        height={384}
        className="object-contain rounded-t-lg"
      />
      <div className="flex justify-between">
        <div className="p-3">
          <span className="text-xl">
            {name}
          </span>
          <span className="text-gray-400 ml-2">
            {`(${product_category})`}
          </span>
        </div>
        <div className="text-xl p-3">
          {`$${price}`}
        </div>
      </div>
      <div className="flex justify-end">
        <button type="button" className="btn__addtocart">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Card