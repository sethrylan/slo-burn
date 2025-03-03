import { useTheme } from './theme-provider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <div className="theme-toggle">
      <button 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label="Toggle theme"
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        className="theme-button"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  )
}
