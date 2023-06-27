import Document, { Head, Html, Main, NextScript } from "next/document";

const isProd = process.env.NODE_ENV === "production";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (<Html>
      <Head>
        {/* Cloudflare Web Analytics and Umami Analytics */}
        {isProd && (<>
          <script async src="http://umami.localhost/script.js" data-website-id="522e1b94-42fb-4e89-9582-2aacb28500ce" />
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "8cf4d134ee8a33518b72e78bc9e1eaa8", "spa": true}'
          />
        </>)}
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>);
  }
}