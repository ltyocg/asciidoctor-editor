import Editor from '@monaco-editor/react'
import {useState} from 'react'
import AsciidocView from './components/AsciidocView'

function App() {
  const height = '90vh'
  const [content, setContent] = useState('')
  const [raw, setRaw] = useState(false)
  return <div style={{display: 'flex', flexWrap: 'wrap'}}>
    <div style={{width: '50%'}}/>
    <div style={{width: '50%'}}>
      <button onClick={() => setRaw((v) => !v)}>{raw ? '渲染结果' : '原始内容'}</button>
    </div>
    <Editor width="50%" height={height} value={content} onChange={(v) => setContent(v || '')}/>
    <AsciidocView style={{border: 'none', width: '50%', height}} input={content} raw={raw}/>
  </div>
}

export default App
