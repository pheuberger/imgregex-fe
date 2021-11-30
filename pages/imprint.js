import React from 'react'
import Head from '../components/Head'
import Nav from '../components/Nav'
import '../styles/index.css'

const Imprint = () => (
  <div>
    <Head title="imgregex imprint" />

    <Nav />
    <div className="p-8">
      <div className="mb-6 md:w-1/2 sm:mx-auto mt-10 text-gray-700">
        <h1 className="text-2xl font-bold">Imprint</h1>
        <p>Information in accordance with section 5 TMG</p>
        <br /> Contact information here
        <h3 className="text-xl font-semibold mt-4">Contact</h3>
        <p>
          <span className="font-medium">Phone:</span> 0 (123) 456789
          <br /> <span className="font-medium">Mail:</span> hello [at] pheuberger.com
        </p>
        <h3 className="text-xl font-semibold mt-4">Disclaimer</h3>
        Accountability for content The contents of our pages have been created with the utmost care. However, we cannot
        guarantee the contents' accuracy, completeness or topicality. According to statutory provisions, we are
        furthermore responsible for our own content on these web pages. In this context, please note that we are
        accordingly not obliged to monitor merely the transmitted or saved information of third parties, or investigate
        circumstances pointing to illegal activity. Our obligations to remove or block the use of information under
        generally applicable laws remain unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG).
        <h3 className="text-xl font-semibold mt-4">Accountability for links</h3>
        Responsibility for the content of external links (to web pages of third parties) lies solely with the operators
        of the linked pages. No violations were evident to us at the time of linking. Should any legal infringement
        become known to us, we will remove the respective link immediately.
        <h3 className="text-xl font-semibold mt-4">Copyright</h3>
        Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law (§ 44a
        et seq. of the copyright law), every form of utilizing, reproducing or processing works subject to copyright
        protection on our web pages requires the prior consent of the respective owner of the rights. Individual
        reproductions of a work are allowed only for private use, so must not serve either directly or indirectly for
        earnings. Unauthorized utilization of copyrighted works is punishable (§ 106 of the copyright law).
      </div>
    </div>
  </div>
)

export default Imprint
