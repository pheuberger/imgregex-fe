import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Headline from '../components/Headline'
import LiveDemo from '../components/LiveDemo'
import BizCard from '../public/gates-card.jpg'
import BizCardWebp from '../public/gates-card.webp'
import Head from '../components/Head'
import { Picture } from 'react-responsive-picture'
import '../styles/index.css'

const demoResponse = (
  <pre>
    <span className="text-gray-600">{'{'}</span>
    <br />
    {'  '}
    <span className="text-white">matches</span>
    <span className="text-gray-600">: [</span>
    <br />
    {'    '}
    <span className="text-green-400">'(505) 256-3600'</span>
    <span className="text-gray-600">,</span>
    <br />
    {'    '}
    <span className="text-green-400">'505'</span>
    <span className="text-gray-600">,</span>
    <br />
    {'    '}
    <span className="text-green-400">'256-3600'</span>
    <span className="text-gray-600">,</span>
    <br />
    {'  '}
    <span className="text-gray-600">],</span>
    <br />
    {'  '}
    <span className="text-white">line</span>
    <span className="text-gray-600">: [</span>
    <br />
    {'    '}
    <span className="text-green-400">'(505) 256-3600'</span>
    <br />
    {'  '}
    <span className="text-gray-600">
      ]
      <br />
      {'}'}
    </span>
  </pre>
)

const regexx = `\\D?(\\d{3})\\D?\\D?(\\d{3}\\D?\\d{4})`

const Home = () => (
  <div>
    <Head />
    <Nav />

    <div className="px-0 pt-16">
      <div className="tracking-tight font-bold mx-auto text-2xl sm:text-4xl text-gray-700 text-center px-8">
        Extract or grep machine&nbsp;readable&nbsp;text
        <br /> from an image
      </div>
      <div className="text-gray-600 text-center font-normal w-full md:w-3/4 lg:w-1/2 px-8 mx-auto sm:text-lg mt-2">
        Capture email addresses from business cards, reference numbers from court papers and much
        more
      </div>
      <div>
        <div className="mx-8 lg:flex md:mx-auto lg:w-1/2 xl:w-3/4 md:justify-around md:items-center mt-16">
          <div>
            <div className="max-w-md sm:h-64 sm:w-96 mx-auto rounded overflow-hidden relative shadow-lg">
              <Picture
                className="h-full w-full object-center object-cover"
                alt="Bill Gates' business card from a couple of decades ago"
                sources={[
                  {
                    srcSet: BizCard
                  },
                  {
                    srcSet: BizCardWebp,
                    type: 'image/webp'
                  }
                ]}
              />
            </div>
          </div>
          <div className="text-center text-gray-400 mx-6">
            <svg
              className="w-12 h-12 fill-current hidden lg:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.163 4.516c.418.408 4.502 4.695 4.502 4.695a1.095 1.095 0 0 1 0 1.576s-4.084 4.289-4.502 4.695c-.418.408-1.17.436-1.615 0-.446-.434-.481-1.041 0-1.574L11.295 10 7.548 6.092c-.481-.533-.446-1.141 0-1.576.445-.436 1.197-.409 1.615 0z" />
            </svg>
            <svg
              className="w-12 h-12 fill-current my-6 mx-auto lg:hidden "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z" />
            </svg>
          </div>
          <div>
            <div className="max-w-md sm:h-64 sm:w-96 mx-auto bg-gray-800 rounded p-6 font-mono text-sm shadow-lg">
              {demoResponse}
            </div>
          </div>
        </div>
        <div className="mx-8 md:mx-auto md:w-1/2 text-center mt-12">
          <div className="text-gray-500 uppercase font-semibold tracking-wide text-xs">
            Using a regex that matches{' '}
            <span className="text-gray-600">US&nbsp;phone&nbsp;numbers</span>:
          </div>
          <div className="text-gray-700 inline-block text-xs sm:text-sm font-mono font-semibold break-all mt-2 border-b border-red-300">
            {regexx}
          </div>
        </div>
      </div>
      <div className="faq md:mt-16 md:bg-gray-100 w-full pt-16">
        <Headline>Some questions you might have</Headline>
        <div className="columns md:w-3/4 mx-8 md:mx-auto mt-8">
          <div className="mb-12">
            <div className="font-bold text-lg sm:text-xl text-gray-700">&raquo; Who are you?</div>
            <p>
              I'm Philipp and I'm running{' '}
              <a href="https://capturekit.app" target="_blank" rel="noopener noreferrer">
                CaptureKit
              </a>
              , a web app that helps companies capture data from scanned documents. While it does
              also automatically recognize machine readable text, it's specifically built to deal
              with handwritten text and marked checkboxes on documents such as surveys.
            </p>
            <p className="mt-3">
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
          <div className="mb-12">
            <div className="font-bold text-lg sm:text-xl text-gray-700">
              &raquo; What happens to the uploaded images?
            </div>
            The images will be stored temporarily to generate the response and for quality
            assurance. This is a beta, so I need to be able to investigate any hiccups. If you
            disagree with this, don't use this service.
          </div>
          <div className="mb-12">
            <div className="font-bold text-lg sm:text-xl text-gray-700">
              &raquo; Why can I only use the global flag here?
            </div>
            This is just for the purpose of this demo page. I wanted to launch this page as quickly
            as possible, so it doesn't yet come with all the bells and whistles. But worry not,{' '}
            <span className="font-medium">
              when sending a request to the API you can of course set all the flags your heart
              desires.
            </span>
          </div>
          <div className="mb-12">
            <div className="font-bold text-lg sm:text-xl text-gray-700">
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
      <div id="get-access" className="faq py-16 px-8 md:bg-gray-100">
        <Headline>How do I get access?</Headline>
        <div className="md:w-1/2 mx-auto">
          To get access to the API, drop me an email at&nbsp;
          <a href="mailto:hello@imgregex.com" target="_blank" rel="noopener noreferrer">
            hello@imgregex.com
          </a>
          . I want to personally onboard you, so I can get you up and running with imgregex as
          quickly as possible. ⚡️
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

export default Home
