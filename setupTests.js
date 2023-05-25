import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import 'jest-extended'
import ResizeObserver from 'resize-observer-polyfill'

global.ResizeObserver = ResizeObserver
global.requestAnimationFrame = fn => window.setTimeout(fn, 0)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
