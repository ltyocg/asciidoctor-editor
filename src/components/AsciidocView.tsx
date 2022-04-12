import asciidoctor from 'asciidoctor'
import {CSSProperties, useEffect, useRef} from "react"

const asciidoc = asciidoctor()
const defaultTitle = 'Untitled'

function AsciidocView({input, raw, style}: {
  input: string
  raw: boolean
  style?: CSSProperties
}) {
  const asciidocDocument = asciidoc.load(input)
  const title = asciidocDocument.getTitle()
  const iframe = useRef<HTMLIFrameElement>(null)
  const content = asciidocDocument.convert()
  useEffect(() => {
    const contentDocument = iframe.current?.contentDocument
    if (contentDocument) {
      contentDocument.open()
      contentDocument.write(`
      <html lang="zh">
        <head>
          <meta charSet="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="generator" content="Asciidoctor ${asciidoc.getCoreVersion()}">
          <title>${title || defaultTitle}</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,300italic,400,400italic,600,600italic%7CNoto+Serif:400,400italic,700,700italic%7CDroid+Sans+Mono:400,700">
          <link rel="stylesheet" href="./asciidoctor-default.css">
        </head>
        <body class="article">
        <div id="header">${title ? `<h1>${title}</h1>` : ''}</div>
        <div id="content">${content}</div>
        </body>
      </html>`)
    }
  }, [input, raw])
  if (raw) return <div style={style}>{content.split('\n').flatMap((line) => [line, <br/>])}</div>
  return <iframe ref={iframe} style={style} title="asciidoc-view"/>
}

export default AsciidocView
