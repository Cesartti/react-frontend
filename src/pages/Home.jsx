import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'https://fastapi-backend-production-7f62.up.railway.app'

function Home() {
  const [projectId, setProjectId] = useState('')
  const [campo1, setCampo1] = useState('')
  const [campo2, setCampo2] = useState('')
  const [entries, setEntries] = useState([])

  const fetchEntries = async () => {
    if (projectId) {
      const res = await axios.get(`${API_URL}/matrix/${projectId}`)
      setEntries(res.data)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${API_URL}/matrix/`, {
      project_id: parseInt(projectId),
      campo1,
      campo2
    })
    setCampo1('')
    setCampo2('')
    fetchEntries()
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Matriz de Proyecto</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='ID Proyecto'
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        />
        <input
          placeholder='Campo 1'
          value={campo1}
          onChange={(e) => setCampo1(e.target.value)}
          required
        />
        <input
          placeholder='Campo 2'
          value={campo2}
          onChange={(e) => setCampo2(e.target.value)}
          required
        />
        <button type='submit'>Guardar</button>
      </form>

      <hr />

      <h3>Entradas del Proyecto</h3>
      <table border='1'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Campo 1</th>
            <th>Campo 2</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.campo1}</td>
              <td>{entry.campo2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home
