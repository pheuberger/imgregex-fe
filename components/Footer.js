import React from 'react'
import Link from 'next/link'

const Footer = () => (
  <footer className="h-20 w-full p-4 border-t border-gray-200 bg-gray-100 text-sm font-medium text-gray-600 text-center flex justify-center align-middle">
    <div className="self-center">
      &copy; imgregex.com &bull;{' '}
      <Link href="/imprint">
        <a className="hover:text-gray-700">Imprint</a>
      </Link>
    </div>
  </footer>
)

export default Footer
