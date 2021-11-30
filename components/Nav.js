import React from 'react'
import Link from 'next/link'
import Logo from '../public/irgx-logo.svg'
import Icon from '../public/irgx-icon.svg'

const Nav = () => (
  <nav className="flex flex-col w-full top-0">
    <div className="pt-6 px-8 justify-between items-center flex">
      <Link href="/">
        <a>
          <img src={Logo} className="h-10 hidden sm:block" alt="imgregex logo" />
          <img src={Icon} className="h-10 sm:hidden" alt="imgregex logo" />
        </a>
      </Link>

      <div className="flex text-gray-800">
        <a href="/#live-demo" className="font-semibold">
          Try it out
        </a>
        <a
          href="/#get-access"
          className="ml-6 border-b-2 border-red-500 hover:text-red-500 font-bold text-center"
        >
          Get access
        </a>
      </div>
    </div>
  </nav>
)

export default Nav
