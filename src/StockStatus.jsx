export default function StockStatus() {

  const stockData = [
    { name: "Frames", percent: 85 },
    { name: "Lenses", percent: 65 },
    { name: "Contact Lenses", percent: 42 },
    { name: "Sunglasses", percent: 78 }
  ];

  const getColor = (percent) => {
    if (percent >= 70) return "blue";
    if (percent >= 40) return "green";
    return "orange";
  };

  return (
    <div className="panel">
      <h3>Stock Status</h3>

      {stockData.map((item, index) => (
        <div className="stock-item" key={index}>
          <div className="stock-row">
            <span>{item.name}</span>
            <span>{item.percent}%</span>
          </div>

          <div className="progress">
            <div
              className={`progress-fill ${getColor(item.percent)}`}
              style={{ width: `${item.percent}%` }}
            ></div>
          </div>
        </div>
      ))}

    </div>
  );
}