import React from 'react'
import { BarPriceProps } from '@/types'

const BarPrice = ({ title, price }: BarPriceProps ) => {
  return (
    <div className="barprice">
      <div className="barprice__title">
        {title}
      </div>
      <div className="barprice__price">
        {price}
      </div>
    </div>
  )
}

export default BarPrice