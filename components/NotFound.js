/** @jsx jsx */
import { jsx } from '@emotion/core'
import tw from 'tailwind.macro'
import { Centered } from '../global/styles'

export const NotFound = () => (
  <Centered>
    <div css={tw`font-semibold font-mono font-gray-700`}>Sorry, 404.</div>
  </Centered>
)
