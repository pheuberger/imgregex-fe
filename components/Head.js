import NextHead from 'next/head'

const defaultDesc = `Capture any machine readable text from images or scans like email addresses from business cards or reference numbers from court papers.`
const defaultTitle = `imgregex: Extract machine readable text from images`
const defaultURL = `https://imgregex.com/`

const Head = ({ title = undefined, description = undefined, url = undefined }) => {
  const desc = description || defaultDesc

  return (
    <NextHead>
      <title>{title || defaultTitle}</title>
      <meta name="theme-color" content="#f56565" />
      <meta name="description" content={desc} />
      <meta property="og:description" content={desc} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title || defaultTitle} />
      <meta property="twitter:image" content="https://imgregex.com/imgregex-card.png" />
      <meta name="twitter:site" content="@lowestdef" />
      <meta property="og:url" content={url || defaultURL} />
      <meta property="og:title" content={title || defaultTitle} />
      {title && <meta property="og:site_name" content="imgregex" />}
      <meta property="og:image" content="https://imgregex.com/imgregex-card.png" />

      <link rel="manifest" href="/manifest.json" />

      {/* <link
        href="https://fonts.googleapis.com/css?family=Signika+Negative&display=swap"
        rel="stylesheet"
      /> */}
    </NextHead>
  )
}

export default Head
