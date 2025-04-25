import React, { useState } from 'react';
import Calculator from './components/Calculator';
import { ShoppingBag } from 'lucide-react';

function App() {
  const [activeCalculator] = useState<'shopee' | 'mercadolivre'>('shopee');

  return (
    <div className="flex min-h-screen bg-[#f5f7f9]">
      {/* Sidebar */}
      <div className="w-64 bg-[#4a6670] text-white">
        <div className="p-4 border-b border-[#5c7882]">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8" />
            <span className="text-lg font-semibold">Calculadora</span>
          </div>
        </div>
        
        <nav className="p-4">
          <div className="space-y-2">
            <button 
              className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full bg-[#5c7882] transition-colors"
            >
              <img 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzE0LTIyOjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDMtMjBUMTY6MzU6MzctMDM6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDMtMjBUMTY6MzU6MzctMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTAzLTIwVDE2OjM1OjM3LTAzOjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY2ZjI5ZjE5LTJiZDAtNDJhZi1hZjE5LTJiZDY5ZjE5ZjE5ZiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjY2ZjI5ZjE5LTJiZDAtNDJhZi1h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"
                alt="Shopee" 
                className="h-5 w-5"
              />
              <span>Shopee</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Calculator marketplace={activeCalculator} />
        </div>
      </div>
    </div>
  );
}

export default App;