import React, { useState } from 'react'
import axios from 'axios'

export default function Playground() {
  const [method, setMethod] = useState('GET')
  const [url, setUrl] = useState('')
  const [body, setBody] = useState('{}')
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const config = {
        method: method,
        url: url,
        headers: { 'Content-Type': 'application/json' },
        data: method === 'POST' ? JSON.parse(body) : undefined,
      }

      const res = await axios(config)
      setResponse(res.data)
    } catch (err) {
      setError(err.message || 'Request Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">🧪 Mini Postman</h1>

      <div className="flex mb-2 gap-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="p-2 bg-gray-800 text-white"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select>

        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 p-2 bg-gray-200"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>

      {method === 'POST' && (
        <textarea
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='Enter JSON body'
          className="w-full p-2 bg-gray-100 font-mono text-sm mb-2"
        />
      )}

      {loading && <p>Loading...</p>}

      {error && <div className="text-red-600">❌ {error}</div>}

      {response && (
        <pre className="bg-gray-900 text-green-400 p-4 mt-2 overflow-auto text-sm rounded">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  )
}
