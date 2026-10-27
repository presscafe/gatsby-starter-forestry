const React = require('react')

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="favicon" rel="icon" type="image/svg+xml" href="/favicon.svg" />,
    <meta key="color-scheme" name="color-scheme" content="light" />,
  ])
}
