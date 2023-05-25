import React from 'react'
import 'resize-observer-polyfill'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts'
import apiFetch from '@wordpress/api-fetch'
import { SelectControl } from '@wordpress/components'
import { useEffect, useState } from '@wordpress/element'

const Chart = ({ chartHeight = '100%' }) => {
  const fetchData = async () => {
    let response = []
    try {
      apiFetch.use(apiFetch.createNonceMiddleware(window.graphWidgetSettings.nonce))
      response = await apiFetch({
        path: '/wp-json/rankmath/v1/widget/dashboard',
        method: 'GET'
      })

      setIsError(false)
    } catch (error) {
      setIsError(true)
    }

    setChartData(response)
  }

  useEffect(() => {
    fetchData()
  }, [])

  /**
   * Data state.
   */
  const [chartData, setChartData] = useState([])
  const [isError, setIsError] = useState(false)
  const [selectFilter, setSelectFilter] = useState(7)
  const handleChange = (value) => {
    setSelectFilter(value)
  }

  const filteredData = chartData?.slice(-selectFilter)

  return (
    <div className={'dashboard-widget'}>
      {isError && <div className={'dashboard-widget-error'}>Error in loading Data</div>}
      {!isError &&
        <div className={'dashboard-widget-container'}>
          <div className={'dashboard-select'}>
            <SelectControl
              id="filter-select"
              data-testid="filter-select"
              value={`${selectFilter}`}
              options={ [
                { label: 'Last 7 DAYS', value: 7 },
                { label: 'Last 15 DAYS', value: 15 },
                { label: 'Last 30 DAYS', value: 30 }
              ] }
              onChange={ (value) => handleChange(value) }
            />
          </div>
          <ResponsiveContainer width={'100%'} height={chartHeight} aspect={1}>
            <LineChart width={'100%'} height={470} data={filteredData}>
              <CartesianGrid strokeDasharray="3,4" />
              <XAxis dataKey="day" />
              <YAxis dataKey="value" />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      }
    </div>
  )
}

const anyOf = (allowedTypes) => (props, propsName, componentName) => {
  const propValue = props[propsName]
  const validTypes = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes]
  const isValid = validTypes.some((type) => {
    return typeof propValue === 'string' || typeof propValue === 'number'
  })

  if (!isValid) {
    return new Error('Invalid Pops type Supplied')
  }
}

Chart.propTypes = {
  chartHeight: anyOf(['string', 'number'])
}
export default Chart
