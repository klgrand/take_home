import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
          <Link href="/" className="navbar__text text-2xl font-semibold text-white">
            Take Home
          </Link>
          <Link href="/cart" className="navbar__logo-cart">
            <Image
              src="/shopping-cart.svg"
              alt="cart icon"
              width={24}
              height={24}
            />
          </Link>
      </div>
    </nav>
  )
}

export default Navbar