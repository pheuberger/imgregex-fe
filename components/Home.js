/** @jsx jsx */
import { jsx } from '@emotion/core'
import tw from 'tailwind.macro'
import React, { useState, useCallback, useEffect } from 'react'
import { Content } from '../global/styles'
import { Link } from '@reach/router'
import { useDropzone } from 'react-dropzone'
import styled from '@emotion/styled'
import ReactJson from 'react-json-view'
import axios from 'axios'
import cfg from '../config'
import BizCard from '../assets/gates-card.png'

// Matches phone numbers quite well
// /([\(\+])?([0-9]{1,3}([\s])?)?([\+|\(|\-|\)|\s])?([0-9]{2,4})([\-|\)|\.|\s]([\s])?)?([0-9]{2,4})?([\.|\-|\s])?([0-9]{4,8})/

const Dropzone = styled.div`
  ${tw`border-2 w-full h-full bg-red-600 border-dashed text-center border-red-700 text-gray-500 font-medium table relative cursor-pointer`};
`

const LiveDemo = () => {
  const [imgSrc, setImgSrc] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState()
  const [rootName, setRootName] = useState()
  const regex = useFormInput('')

  async function gitit() {
    console.log('gettin it')
    setIsLoading(true)
    try {
      const result = await axios({
        method: 'post',
        baseURL: cfg.apiGateway.URL,
        url: '/demo',
        data: {
          regex: regex.value,
          base64_image: imgSrc
        }
      })
      console.log('got damn ', result)
      setCode(result.data)
      setRootName('response')
      setIsLoading(false)
    } catch (err) {
      console.log('errrrrrorr ', err.response)
      setCode(err.response.data)
      setRootName('error')
      setIsLoading(false)
    }
  }

  const valid = imgSrc && regex.value
  function submitClicked() {
    if (valid) {
      gitit()
    }
  }

  const onDrop = useCallback(files => {
    console.log('ondrop', files)
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      setImgSrc(reader.result)
    }

    if (files.length === 0) {
      setRootName('Error')
      return
    }
    reader.readAsDataURL(files[0])
  }, [])

  const { rejectedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop
  })

  const rejected =
    rejectedFiles.length > 0
      ? { message: `${rejectedFiles[0].path} is not supported. Select either .png or .jpg files.` }
      : {}

  return (
    <div id="live-demo" css={tw`py-16`}>
      <Headline text="Go ahead, try it out right now" />
      <div css={tw`text-gray-600 text-center font-normal sm:w-1/2 mx-8 sm:mx-auto sm:text-lg mt-2`}>
        Upload an image and enter a regular expression. No regex comes to mind? Try&nbsp;
        <span css={tw`ml-1 font-semibold bg-gray-300 text-gray-700 rounded px-2 py-1`}>.+</span>
      </div>
      <div css={tw`md:flex mt-16`}>
        <div css={tw`md:w-1/2 px-8 sm:px-0`}>
          <div css={tw`w-full sm:w-80 mx-auto`}>
            <div css={tw`rounded bg-red-500 sm:w-80 h-64 sm:h-112 p-3`}>
              {!imgSrc ? (
                <Dropzone {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <p css={tw`table-cell text-center text-white align-middle`}>
                    First, drop an image here
                    <br />
                    or <span css={tw`underline`}>click to select an image</span>
                  </p>
                </Dropzone>
              ) : (
                <img
                  css={tw`w-full h-full object-cover`}
                  alt="You just uploaded this"
                  src={imgSrc}
                />
              )}
            </div>
            <div css={tw`flex mt-2`}>
              <div
                className="flex-grow flex-shrink"
                css={tw`flex text-xs sm:text-sm h-10 border-b border-red-500 font-mono items-center mr-3`}
              >
                <div css={tw`text-gray-500`}>/</div>
                <input
                  className="flex-grow"
                  css={tw`focus:outline-none px-1`}
                  type="text"
                  id="regex"
                  name="regex"
                  placeholder="<your regex here>"
                  {...regex}
                />
                <div css={tw`text-gray-500`}>/g</div>
              </div>
              <button
                type="button"
                className={'flex-shrink-0 ' + (valid ? 'button' : 'button-disabled')}
                onClick={submitClicked}
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <div css={tw`md:w-1/2 flex justify-end`}>
          <CodeBox isLoading={isLoading} code={code || rejected} name={rootName} />
        </div>
      </div>
    </div>
  )
}

const CodeBox = ({ isLoading = false, name = null, code = {}, ...props }) => {
  return (
    <div
      css={tw`bg-gray-800 rounded md:rounded-l h-112 w-full shadow-lg text-left text-white p-6 pt-12 relative mt-16 md:mt-0 mx-8 md:mx-0`}
      {...props}
    >
      <div css={tw`absolute h-8 top-0 left-0 flex mt-4 ml-4 items-baseline`}>
        <div css={tw`rounded-full bg-red-500 w-3 h-3`}></div>
        <div css={tw`rounded-full bg-yellow-500 w-3 h-3 ml-2`}></div>
        <div css={tw`rounded-full bg-green-500 w-3 h-3 ml-2`}></div>
        <div css={tw`ml-8 text-xs uppercase tracking-wide font-medium text-gray-600`}>
          api response
        </div>
      </div>
      <div css={tw`w-full h-full overflow-scroll`}>
        {isLoading ? (
          <div className="loading" css={tw``}>
            <div />
            <div />
            <div />
          </div>
        ) : (
          <ReactJson
            name={name}
            src={code}
            style={{ background: 'transparent' }}
            theme="hopscotch"
            enableClipboard={false}
            displayDataTypes={false}
            displayObjectSize={false}
          />
        )}
      </div>
    </div>
  )
}

function Headline({ text }) {
  return (
    <div
      className="font-soft"
      css={tw`font-semibold text-xl sm:text-2xl text-gray-700 text-center px-8 mb-4`}
    >
      {text}
    </div>
  )
}

const demoResponse = (
  <pre>
    <span css={tw`text-gray-600`}>{'{'}</span>
    <br />
    {'  '}
    <span css={tw`text-white`}>matches</span>
    <span css={tw`text-gray-600`}>: [</span>
    <br />
    {'    '}
    <span css={tw`text-green-400`}>'(505) 256-3600'</span>
    <span css={tw`text-gray-600`}>,</span>
    <br />
    {'    '}
    <span css={tw`text-green-400`}>'505'</span>
    <span css={tw`text-gray-600`}>,</span>
    <br />
    {'    '}
    <span css={tw`text-green-400`}>'256-3600'</span>
    <span css={tw`text-gray-600`}>,</span>
    <br />
    {'  '}
    <span css={tw`text-gray-600`}>],</span>
    <br />
    {'  '}
    <span css={tw`text-white`}>line</span>
    <span css={tw`text-gray-600`}>: [</span>
    <br />
    {'    '}
    <span css={tw`text-green-400`}>'(505) 256-3600'</span>
    <br />
    {'  '}
    <span css={tw`text-gray-600`}>
      ]
      <br />
      {'}'}
    </span>
  </pre>
)

const regexx = `\\D?(\\d{3})\\D?\\D?(\\d{3}\\D?\\d{4})`

export const Home = () => {
  return (
    <Content css={tw`px-0 pt-16`}>
      <div
        className="font-soft"
        css={tw`font-semibold mx-auto text-2xl sm:text-4xl text-gray-700 text-center px-8`}
      >
        Extract or grep machine&nbsp;readable&nbsp;text
        <br /> from an image
      </div>
      <div
        css={tw`text-gray-600 text-center font-normal w-full md:w-3/4 lg:w-1/2 px-8 mx-auto sm:text-lg mt-2`}
      >
        Capture email addresses from business cards, reference numbers from court papers and much
        more
      </div>
      <div>
        <div
          css={tw`mx-8 lg:flex md:mx-auto lg:w-1/2 xl:w-3/4 md:justify-around md:items-center mt-16`}
        >
          <div>
            <div
              css={tw`max-w-md sm:h-64 sm:w-96 mx-auto rounded overflow-hidden relative shadow-lg`}
            >
              <img css={tw`h-full w-full object-center object-cover`} src={BizCard} />
            </div>
          </div>
          <div css={tw`text-center text-gray-400 mx-6`}>
            <svg
              css={tw`w-12 h-12 fill-current hidden lg:block`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.163 4.516c.418.408 4.502 4.695 4.502 4.695a1.095 1.095 0 0 1 0 1.576s-4.084 4.289-4.502 4.695c-.418.408-1.17.436-1.615 0-.446-.434-.481-1.041 0-1.574L11.295 10 7.548 6.092c-.481-.533-.446-1.141 0-1.576.445-.436 1.197-.409 1.615 0z" />
            </svg>
            <svg
              css={tw`w-12 h-12 fill-current my-6 mx-auto lg:hidden `}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z" />
            </svg>
          </div>
          <div>
            <div
              css={tw`max-w-md sm:h-64 sm:w-96 mx-auto bg-gray-800 rounded p-6 font-mono text-sm shadow-lg`}
            >
              {demoResponse}
            </div>
          </div>
        </div>
        <div css={tw`mx-8 md:mx-auto md:w-1/2 text-center mt-12`}>
          <div css={tw`text-gray-500 uppercase font-semibold tracking-wide text-xs`}>
            Using a regex that matches{' '}
            <span css={tw`text-gray-600`}>US&nbsp;phone&nbsp;numbers</span>:
          </div>
          <div
            css={tw`text-gray-700 inline-block text-xs sm:text-sm font-mono font-semibold break-all mt-2 border-b border-red-300`}
          >
            {regexx}
          </div>
        </div>
      </div>
      <div css={tw`md:mt-16 md:bg-gray-100 w-full pt-16`} className="faq">
        <Headline text="Some questions you might have" />
        <div css={tw`md:w-3/4 mx-8 md:mx-auto mt-8`} className="columns">
          <div css={tw`mb-12`}>
            <div className="font-soft" css={tw`font-semibold text-lg sm:text-xl text-gray-700`}>
              &raquo; Who are you?
            </div>
            <p>
              I'm Philipp and I'm running{' '}
              <a href="https://capturekit.app" target="_blank" rel="noopener noreferrer">
                CaptureKit
              </a>
              , a web app that helps companies capture data from scanned documents. While it does
              also automatically recognize machine readable text, it's specifically built to deal
              with handwritten text and marked checkboxes on documents such as surveys.
            </p>
            <p css={tw`mt-3`}>
              My personal blog is at{' '}
              <a href="https://pheuberger.com" target="_blank" rel="noopener noreferrer">
                pheuberger.com
              </a>{' '}
              where I write about software development and business. Mostly about bootstrapping. I
              also tweet&nbsp;
              <a href="https://twitter.com/lowestdef" target="_blank" rel="noopener noreferrer">
                @lowestdef
              </a>
              .
            </p>{' '}
          </div>
          <div css={tw`mb-12`}>
            <div className="font-soft" css={tw`font-semibold text-lg sm:text-xl text-gray-700`}>
              &raquo; Uhm, do you have a regex tester at hand?
            </div>
            Absolutely! The one over at{' '}
            <a href="https://regex101.com" target="_blank" rel="noopener noreferrer">
              regex101.com
            </a>{' '}
            is pretty comprehensive.
          </div>
          <div css={tw`mb-12`}>
            <div className="font-soft" css={tw`font-semibold text-lg sm:text-xl text-gray-700`}>
              &raquo; What happens to the uploaded images?
            </div>
            The images will be stored temporarily to generate the response and for quality
            assurance. This is a beta, so I need to be able to investigate any hiccups. If you
            disagree with this, don't use this service.
          </div>
          <div css={tw`mb-12`}>
            <div className="font-soft" css={tw`font-semibold text-lg sm:text-xl text-gray-700`}>
              &raquo; Why can I only use the global flag here?
            </div>
            This is just for the purpose of this demo page. I wanted to launch this page as quickly
            as possible, so it doesn't yet come with all the bells and whistles. But worry not,{' '}
            <span css={tw`font-medium`}>
              when sending a request to the API you can of course set all the flags your heart
              desires.
            </span>
          </div>
          <div css={tw`mb-12`}>
            <div className="font-soft" css={tw`font-semibold text-lg sm:text-xl text-gray-700`}>
              &raquo; I have a use-case. Can you help me with the regex?
            </div>
            Sure, send me a mail and I will try to help you:&nbsp;
            <a href="mailto:hello@imgregex.com" target="_blank" rel="noopener noreferrer">
              hello@imgregex.com
            </a>
          </div>
        </div>
      </div>
      <LiveDemo />
      <div css={tw`py-16 px-8 md:bg-gray-100`} id="get-access" className="faq">
        <Headline text="How do I get access?" />
        <div css={tw`md:w-1/2 mx-auto`}>
          To get access to the API, drop me an email at&nbsp;
          <a href="mailto:hello@imgregex.com" target="_blank" rel="noopener noreferrer">
            hello@imgregex.com
          </a>
          . I want to personally onboard you, so I can get you up and running with imgregex as
          quickly as possible. ⚡️
        </div>
      </div>
    </Content>
  )
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue)

  function handleChange(evt) {
    setValue(evt.target.value)
  }
  return { value, onChange: handleChange }
}
