import ReactDOM from 'react-dom/client'

/**
 * You can switch between different App components by changing the import statement below.
 * OR
 * I have just been updating the index.html path to point to main
 */
import App from './part1/anecdotes/App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)