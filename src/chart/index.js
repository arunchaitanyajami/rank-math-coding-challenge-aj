import React, { useState, useEffect } from 'react'
import 'resize-observer-polyfill'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts'

const Chart = ({ chartHeight = '100%' }) => {
  /**
   * Data state.
   */
  const [selectFilter, setSelectFilter] = useState(7)
  const [chartData, setChartData] = useState([])

  /**
   * Error states.
   */
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsError(false)
    const fetchData = async () => {
      try {
        const response = await fetch(window.graphWidgetSettings.siteUrl + 'rankmath/v1/widget/dashboard')
        const data = await response.json()
        setChartData(data)
      } catch (error) {
        setIsError(true)
      }
    }

    fetchData()
  }, [])

  const handleChange = (event) => {
    setSelectFilter(event.target.value)
  }

  const filteredData = chartData.slice(-selectFilter)

  return (
        <div className={'dashboard-widget'}>
          { isError === 0 && <div className={'dashboard-widget-error'}>Error in loading Data</div> }
          <div className={'dashboard-widget-container'}>
            <div className={'dashboard-select'}>
              <select
                  id="filter-select"
                  data-testid="filter-select"
                  value={selectFilter}
                  onChange={handleChange}
              >
                <option value={7}>Last 7 DAYS</option>
                <option value={15}>Last 15 DAYS</option>
                <option value={30}>Last 30 DAYS</option>
              </select>
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
