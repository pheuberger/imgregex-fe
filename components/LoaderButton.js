import React from 'react'

const cssBase = `w-40 h-10 overflow-hidden bg-teal-400 hover:bg-teal-500 focus:outline-none font-semibold text-white text-sm uppercase tracking-wide rounded`
const cssDisabled = `bg-gray-400 hover:bg-gray-400 cursor-not-allowed`

const LoaderButton = ({ name, isLoading = false, disabled = false, ...props }) => (
  <button
    type="button"
    className={cssBase + ' ' + (disabled ? cssDisabled : '')}
    disabled={disabled || isLoading}
    {...props}
  >
    {!isLoading && name}
    {isLoading && (
      <div className="loading">
        <div />
        <div />
        <div />
      </div>
    )}
  </button>
)

export default LoaderButton
