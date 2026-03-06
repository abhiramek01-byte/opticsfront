import "../../styles/BranchMaster.css";
import { useState } from "react";

export default function BranchMaster() {

    const [branches, setBranches] = useState([]);
    const [branchName, setBranchName] = useState("");

    const addBranch = () => {
        if (!branchName) return;
        setBranches([...branches, { name: branchName }]);
        setBranchName("");
    };

    return (
        <div className="branch-page">

            <h2>Branch Master</h2>

            <div className="branch-form">
                <input
                    type="text"
                    placeholder="Branch Name"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                />

                <button onClick={addBranch}>Add Branch</button>
            </div>

            <table className="branch-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Branch Name</th>
                    </tr>
                </thead>

                <tbody>
                    {branches.map((b, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{b.name}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}