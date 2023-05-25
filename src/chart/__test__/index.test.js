import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chart from '../../chart'
import apiFetch from '@wordpress/api-fetch'

jest.mock('@wordpress/api-fetch')

const data = [
  { day: 'Day 1', value: 10 },
  { day: 'Day 2', value: 10 },
  { day: 'Day 3', value: 60 },
  { day: 'Day 4', value: 30 },
  { day: 'Day 5', value: 70 },
  { day: 'Day 6', value: 70 },
  { day: 'Day 7', value: 100 },
  { day: 'Day 8', value: 25 },
  { day: 'Day 9', value: 39 },
  { day: 'Day 10', value: 69 },
  { day: 'Day 11', value: 69 },
  { day: 'Day 12', value: 69 },
  { day: 'Day 13', value: 69 },
  { day: 'Day 14', value: 69 },
  { day: 'Day 15', value: 69 }
]

describe('Chart Component', function () {
  /**
     * Lets mock hooks.
     */
  let originalUseState

  beforeEach(() => {
    window.graphWidgetSettings = {
      siteUrl: '',
      nonce: 'test-nonce'
    }

    originalUseState = jest.spyOn(React, 'useState')
    apiFetch.mockResolvedValueOnce(Promise.resolve(data))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Needs a Snapshot', async () => {
    let renderer

    originalUseState.mockReturnValueOnce([data, jest.fn()])

    await act(async () => {
      renderer = render(<Chart chartHeight={470} />)
    })

    expect(renderer.container).toMatchSnapshot()
  })

  test('Should render properly', async () => {
    let renderer

    originalUseState.mockReturnValueOnce([data, jest.fn()])
    await act(async () => {
      renderer = render(<Chart chartHeight={470} />)
    })

    const { container } = renderer

    expect(container.getElementsByClassName('recharts-wrapper').length).toBe(1)
    expect(container.getElementsByClassName('recharts-cartesian-axis-ticks').length).toBe(2)
  })

  test('Should display default filtered data before changing the filter value', async () => {
    let renderer
    originalUseState.mockReturnValueOnce([data, jest.fn()])
    await act(async () => {
      renderer = render(<Chart chartHeight={470} />)
    })

    const { container } = renderer

    const chartSelect = container.querySelector('#filter-select')
    expect(chartSelect.firstChild.textContent).toBe('Last 7 DAYS')

    const xAxisData = container.querySelectorAll('.recharts-xAxis .recharts-cartesian-axis-tick-line')
    expect(xAxisData.length).toBe(7)

    const xAxisDataFirstChild = container.querySelector(
      '.recharts-xAxis .recharts-cartesian-axis-tick:first-child .recharts-cartesian-axis-tick-value tspan'
    )
    expect(xAxisDataFirstChild.innerHTML).toBe('Day 9')
  })

  test('Should display filtered data when a value changes in the select filter', async () => {
    let renderer
    originalUseState.mockReturnValueOnce([data, jest.fn()])
    originalUseState.mockReturnValueOnce([false, jest.fn()])
    originalUseState.mockReturnValueOnce([15, jest.fn()])

    await act(async () => {
      renderer = render(<Chart chartHeight={470} />)
    })

    const { getByRole, container } = renderer
    const selectFilter = getByRole('combobox')

    fireEvent.change(selectFilter, { target: { value: 15 } })
    await userEvent.selectOptions(selectFilter, '15')

    const xAxisData = container.querySelectorAll('.recharts-xAxis .recharts-cartesian-axis-tick-line')
    expect(xAxisData.length).toBe(15)

    const xAxisDataFirstChild = container.querySelector(
      '.recharts-xAxis .recharts-cartesian-axis-tick:first-child .recharts-cartesian-axis-tick-value tspan'
    )
    expect(xAxisDataFirstChild.innerHTML).toBe('Day 1')
  })
})
