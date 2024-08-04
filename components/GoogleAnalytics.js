import React from "react";
import Script from "next/script";

const GoogleAnalytics = () => {
  return (
    <>
       
<Script async src="https://www.googletagmanager.com/gtag/js?id=G-DQL44FY2BK"></Script>
<Script id="script">
  
  {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-DQL44FY2BK');
`}
</Script>
    </>
  );
};

export default GoogleAnalytics;
