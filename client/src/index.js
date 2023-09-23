import './sass/index.sass'
import './sass/sections.sass'

import * as ReactDOM from 'react-dom/client'
import App from './interfaces/App'

window.ReactRoot = ReactDOM.createRoot(document.getElementById('root'))
window.ReactRoot.render(<App />)