"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import _, { isEmpty } from 'lodash'
import { useCartStateValue } from '@/recoil/atoms/cart'

const Navbar = () => {
  const cart = useCartStateValue()
  return (
    <nav className="navbar">
      <div className="navbar__container">
          <Link href="/" className="navbar__text text-2xl font-semibold text-white">
            Take Home
          </Link>
          <div className="flex gap-4">
            <div className="text-white">
              {`${cart.user_point} Points`}
            </div>
            <Link href="/cart" className="navbar__logo-cart">
              <div className="relative">
                <Image
                  src="/shopping-cart.svg"
                  alt="cart icon"
                  width={24}
                  height={24}
                />
                {!isEmpty(cart?.items) && <div className='absolute w-[12px] h-[12px] bg-red-600 top-0 right-[-6px] rounded-full' />}
              </div>
            </Link>
          </div>
      </div>
    </nav>
  )
}

export default Navbar