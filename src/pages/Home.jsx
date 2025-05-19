import React, { useState } from 'react'
import axios from 'axios'

const API_URL = 'https://fastapi-auth-backend-production.up.railway.app'

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

const labels = {
  codigo_catalogo: 'Código Catálogo',
  medido_a_traves: 'Medido a través de',
  descripcion_indicador: 'Descripción del Indicador',
  producto_mga: 'Producto MGA',
  tipo_indicador: 'Tipo de Indicador',
  linea_base: 'Línea Base',
  meta_cuatrienio: 'Meta Cuatrienio',
  vigencia: 'Vigencia',
  valor_modificado: 'Valor Modificado',
  total_programado: 'Total Programado Vigencia',
  aporte_proyecto: 'Aporte del Proyecto',
  porcentaje_aporte: '% de Aporte',
  valor_final: 'Valor Final',
  aporte_acumulado: 'Aporte Acumulado Proyectos Anteriores',
  porcentaje_total_aporte: '% Total de Aporte'
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
      const numericFields = [
        'linea_base', 'meta_cuatrienio', 'valor_modificado', 'total_programado',
        'aporte_proyecto', 'porcentaje_aporte', 'valor_final',
        'aporte_acumulado', 'porcentaje_total_aporte'
      ]
      numericFields.forEach(key => {
        payload[key] = parseFloat(payload[key]) || 0
      })
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
      <label><strong>{label}</strong></label><br />
      <input name={name} value={form[name]} onChange={handleChange} style={{ width: '100%' }} />
    </div>
  )

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Formulario de Modificación</h2>
      <form onSubmit={handlePreview}>
        {Object.keys(initialState).map((key) => renderInput(labels[key], key))}
        <button type="submit">Vista Previa</button>
      </form>

      {preview && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Vista Previa</h3>
          <table border="1" cellPadding="6">
            <tbody>
              {Object.keys(preview).map((key) => (
                <tr key={key}>
                  <td><strong>{labels[key]}</strong></td>
                  <td>{preview[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <button onClick={handleSubmit}>Confirmar y Enviar</button>
        </div>
      )}
    </div>
  )
}

export default Home
