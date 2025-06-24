import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.alert for tests
;(globalThis as any).alert = vi.fn()
