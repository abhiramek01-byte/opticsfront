import "../../../styles/BranchManagement.css";

export default function BranchSettings() {

  const branches = ["Kochi", "Calicut", "Thrissur"];

  const data = {
    Manager: ["John Manager", "Arun", "Rahul"],
    Stock: ["120 Items", "90 Items", "70 Items"],
    Purchase: ["₹50,000", "₹30,000", "₹20,000"],
    Orders: ["5 Pending", "3 Pending", "2 Pending"],
    Sales: ["₹1,20,000", "₹80,000", "₹60,000"]
  };

  return (
    <div className="bm-root">
      <div className="bm-card">

        {/* HEADER */}
        <div className="bm-header">
          <p className="bm-eyebrow">Operations Dashboard</p>
          <h1 className="bm-title">Branch Settings</h1>
        </div>

        {/* TABLE */}
        <div className="bm-table">

          {/* HEADER ROW */}
          <div className="bm-row header-row">
            <div className="bm-id">Type</div>
            {branches.map((b, i) => (
              <div key={i} className="bm-name">{b}</div>
            ))}
          </div>

          {/* DATA ROWS */}
          {Object.keys(data).map((key, index) => (
            <div className="bm-row" key={index}>

              {/* LEFT LABEL (highlighted) */}
              <div className="bm-id highlight">
                {key}
              </div>

              {/* VALUES */}
              {data[key].map((val, i) => (
                <div key={i} className="bm-name">
                  {val}
                </div>
              ))}

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}