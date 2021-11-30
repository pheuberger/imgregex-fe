import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import cfg from '../config'
import dynamic from 'next/dynamic'
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

import Headline from '../components/Headline'

const LiveDemo = () => {
  const [imgSrc, setImgSrc] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState()
  const [rootName, setRootName] = useState()
  const regex = useFormInput('')

  async function gitit() {
    setIsLoading(true)
    try {
      const result = await axios({
        method: 'post',
        baseURL: cfg.apiGateway.URL,
        url: '/demo',
        data: {
          regex: regex.value,
          base64_image: imgSrc,
        },
      })
      setCode(result.data)
      setRootName('response')
      setIsLoading(false)
    } catch (err) {
      console.log('error ', err.response)
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
    onDrop,
  })

  const rejected =
    rejectedFiles.length > 0
      ? { message: `${rejectedFiles[0].path} is not supported. Select either .png or .jpg files.` }
      : {}

  return (
    <div id="live-demo" className="py-16">
      <Headline>Go ahead, try it out right now</Headline>
      <div className="text-gray-600 text-center font-normal sm:w-1/2 mx-8 sm:mx-auto sm:text-lg mt-2">
        Upload an image and enter a regular expression. No regex comes to mind? Try&nbsp;
        <span className="ml-1 font-semibold bg-gray-300 text-gray-700 rounded px-2 py-1">.+</span>
      </div>
      <div className="md:flex mt-16">
        <div className="md:w-1/2 px-8 sm:px-0">
          <div className="w-full sm:w-80 mx-auto">
            <div className="rounded bg-red-500 sm:w-80 h-64 sm:h-112 p-3">
              {!imgSrc ? (
                <div
                  {...getRootProps({
                    className:
                      'dropzone border-2 w-full h-full bg-red-600 border-dashed text-center border-red-700 text-gray-500 font-medium table relative cursor-pointer',
                  })}
                >
                  <input {...getInputProps()} />
                  <p className="table-cell text-center text-white align-middle">
                    First, drop an image here
                    <br />
                    or <span className="underline">click to select an image</span>
                  </p>
                </div>
              ) : (
                <img className="w-full h-full object-cover" alt="You just uploaded this" src={imgSrc} />
              )}
            </div>
            <div className="flex mt-2">
              <div className="flex-grow flex-shrink flex text-xs sm:text-sm h-10 border-b border-red-500 font-mono items-center mr-3">
                <div className="text-gray-500">/</div>
                <input
                  className="flex-grow focus:outline-none px-1"
                  type="text"
                  id="regex"
                  name="regex"
                  placeholder="<your regex here>"
                  {...regex}
                />
                <div className="text-gray-500">/g</div>
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
        <div className="md:w-1/2 flex justify-end">
          <CodeBox isLoading={isLoading} code={code || rejected} name={rootName} />
        </div>
      </div>
    </div>
  )
}

const CodeBox = ({ isLoading = false, name = null, code = {}, ...props }) => {
  return (
    <div
      className="bg-gray-800 rounded md:rounded-l h-112 w-full shadow-lg text-left text-white p-6 pt-12 relative mt-16 md:mt-0 mx-8 md:mx-0"
      {...props}
    >
      <div className="absolute h-8 top-0 left-0 flex mt-4 ml-4 items-baseline">
        <div className="rounded-full bg-red-500 w-3 h-3"></div>
        <div className="rounded-full bg-yellow-500 w-3 h-3 ml-2"></div>
        <div className="rounded-full bg-green-500 w-3 h-3 ml-2"></div>
        <div className="ml-8 text-xs uppercase tracking-wide font-medium text-gray-600">api response</div>
      </div>
      <div className="w-full h-full overflow-scroll">
        {isLoading ? (
          <div className="loading">
            <div />
            <div />
            <div />
          </div>
        ) : (
          <DynamicReactJson
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

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue)

  function handleChange(evt) {
    setValue(evt.target.value)
  }
  return { value, onChange: handleChange }
}

export default LiveDemo
