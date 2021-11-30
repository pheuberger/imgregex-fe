import React from 'react'

function Headline(props) {
  return (
    <div className="tracking-tight font-bold text-xl sm:text-2xl text-gray-700 text-center px-8 mb-4">
      {props.children}
    </div>
  )
}

export default Headline
