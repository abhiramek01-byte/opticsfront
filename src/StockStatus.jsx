import React from 'react';

export default function StockStatus({ stockCategories = [] }) {

  const getColor = (percent) => {
    if (percent >= 70) return "blue-gradient";
    if (percent >= 40) return "green-gradient";
    return "orange-gradient";
  };

  return (
    <div className="panel stock-status-panel glass-panel">
      <h3>Stock Composition Composition</h3>
      <p className="subtitle" style={{marginBottom: '20px', color: '#64748b', fontSize: '13px'}}>Inventory split by category</p>

      {stockCategories.length > 0 ? stockCategories.map((item, index) => (
        <div className="stock-item" key={index}>
          <div className="stock-row">
            <span className="font-medium text-dark">{item.name} <span style={{fontSize: '11px', color: '#94a3b8'}}>({item.quantity} units)</span></span>
            <span className="font-semibold">{item.percent}%</span>
          </div>

          <div className="progress-bg">
            <div
              className={`progress-fill ${getColor(item.percent)}`}
              style={{ width: `${item.percent}%` }}
            ></div>
          </div>
        </div>
      )) : (
        <div style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
          No stock variants calculated.
        </div>
      )}

    </div>
  );
}