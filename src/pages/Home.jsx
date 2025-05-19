import React, { useState } from 'react'
import axios from 'axios'

const API_URL = 'https://fastapi-auth-backend-production.up.railway.app'

function Home() {
  const [view, setView] = useState('login')
  const [form, setForm] = useState({ username: '', password: '', role: '1' })
  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState({ role: null, user_id: null })

  const login = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('username', form.username)
      formData.append('password', form.password)
      const res = await axios.post(`${API_URL}/token`, formData)
      setToken(res.data.access_token)
      setUserInfo({ role: res.data.role, user_id: res.data.user_id })
      setView('panel')
    } catch (err) {
      alert('Login fallido')
    }
  }

  const register = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/register`, {
        username: form.username,
        password: form.password,
        role: parseInt(form.role)
      })
      alert('Usuario registrado, ahora puedes iniciar sesión.')
      setView('login')
    } catch (err) {
      alert(`Registro fallido: ${err.response?.data?.detail || err.message}`)
    }
  }

  const logout = () => {
    setToken('')
    setUserInfo({ role: null, user_id: null })
    setView('login')
  }

  return (
    <div style={{ padding: '2rem' }}>
      {view === 'login' && (
        <>
          <h2>Iniciar Sesión</h2>
          <form onSubmit={login}>
            <input placeholder="Usuario" onChange={e => setForm({ ...form, username: e.target.value })} />
            <br /><input placeholder="Contraseña" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <br /><button type="submit">Entrar</button>
          </form>
          <br />
          <button onClick={() => setView('register')}>Registrarse</button>
        </>
      )}

      {view === 'register' && (
        <>
          <h2>Registro de Usuario</h2>
          <form onSubmit={register}>
            <input placeholder="Usuario" onChange={e => setForm({ ...form, username: e.target.value })} />
            <br /><input placeholder="Contraseña" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <br />
            <select onChange={e => setForm({ ...form, role: e.target.value })}>
              <option value="1">Creador</option>
              <option value="2">Validador</option>
              <option value="3">Firmante</option>
            </select>
            <br /><button type="submit">Registrarse</button>
          </form>
          <br />
          <button onClick={() => setView('login')}>Volver</button>
        </>
      )}

      {view === 'panel' && (
        <>
          <h2>Bienvenido, Usuario {userInfo.user_id}</h2>
          <p>Rol: {userInfo.role === 1 ? 'Creador' : userInfo.role === 2 ? 'Validador' : 'Firmante'}</p>
          <button onClick={logout}>Cerrar sesión</button>
          <p>Aquí irá el panel completo según el tipo de usuario.</p>
        </>
      )}
    </div>
  )
}

export default Home
