import React from 'react'
import ReactDOM from 'react-dom'
import Chart from "./chart";

/**
 * Render chart if targeted element is observed.
 */
const renderChartComponent = () => {
  ReactDOM.render(<Chart />, document.getElementById('rmgw_dashboard-widget'))
}

document.addEventListener('DOMContentLoaded', renderChartComponent)
