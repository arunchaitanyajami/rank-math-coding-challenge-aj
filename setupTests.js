import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import 'jest-extended';
import ResizeObserver from "resize-observer-polyfill";

global.ResizeObserver = ResizeObserver
global.requestAnimationFrame = fn => window.setTimeout(fn, 0)
