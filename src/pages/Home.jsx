import React, { useState } from 'react'
import axios from 'axios'

const API_URL = 'https://fastapi-backend-production-7f62.up.railway.app/modification-form/'

const initialState = {
  codigo_catalogo: '',
  medido_a_traves: '',
  descripcion_indicador: '',
  producto_mga: '',
  tipo_indicador: '',
  linea_base: '',
  meta_cuatrienio: '',
  vigencia: '',
  valor_modificado: '',
  total_programado: '',
  aporte_proyecto: '',
  porcentaje_aporte: '',
  valor_final: '',
  aporte_acumulado: '',
  porcentaje_total_aporte: ''
}

function Home() {
  const [form, setForm] = useState(initialState)
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handlePreview = (e) => {
    e.preventDefault()
    setPreview(form)
  }

  const handleSubmit = async () => {
    try {
      const payload = { ...form }
      for (let key in payload) {
        if (!isNaN(payload[key])) {
          payload[key] = parseFloat(payload[key])
        }
      }
      await axios.post(API_URL, payload)
      alert('Formulario enviado correctamente')
      setForm(initialState)
      setPreview(null)
    } catch (err) {
      console.error(err)
      alert('Error al enviar el formulario')
    }
  }

  const renderInput = (label, name) => (
    <div style={{ marginBottom: '1rem' }}>
      <label>{label}</label><br />
      <input name={name} value={form[name]} onChange={handleChange} style={{ width: '100%' }} />
    </div>
  )

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Formulario de Modificación</h2>
      <form onSubmit={handlePreview}>
        {renderInput('Código Catálogo', 'codigo_catalogo')}
        {renderInput('Medido a través de', 'medido_a_traves')}
        {renderInput('Descripción del Indicador', 'descripcion_indicador')}
        {renderInput('Producto MGA', 'producto_mga')}
        {renderInput('Tipo de Indicador', 'tipo_indicador')}
        {renderInput('Línea Base', 'linea_base')}
        {renderInput('Meta Cuatrienio', 'meta_cuatrienio')}
        {renderInput('Vigencia', 'vigencia')}
        {renderInput('Valor Modificado', 'valor_modificado')}
        {renderInput('Total Programado Vigencia', 'total_programado')}
        {renderInput('Aporte del Proyecto', 'aporte_proyecto')}
        {renderInput('% de Aporte', 'porcentaje_aporte')}
        {renderInput('Valor Final', 'valor_final')}
        {renderInput('Aporte Acumulado Proyectos Anteriores', 'aporte_acumulado')}
        {renderInput('% Total de Aporte', 'porcentaje_total_aporte')}
        <button type="submit">Vista Previa</button>
      </form>

      {preview && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Vista Previa</h3>
          <pre>{JSON.stringify(preview, null, 2)}</pre>
          <button onClick={handleSubmit}>Confirmar y Enviar</button>
        </div>
      )}
    </div>
  )
}

export default Home
