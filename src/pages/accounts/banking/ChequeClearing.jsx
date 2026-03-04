import "../../../styles/Banking.css";

export default function ChequeClearing() {
    return (
        <div className="bank-page">

            <div className="bank-topbar">
                <button>◀ Previous</button>
                <button>Next ▶</button>
                <button className="edit">Edit</button>

                <div className="right-btns">
                    <button>Cancel</button>
                    <button>Clear</button>
                    <button className="save">Save</button>
                </div>
            </div>

            <div className="bank-filter">

                <label>No</label>
                <input defaultValue="1" />

                <label>Ref No</label>
                <input defaultValue="1" />

                <label>Date</label>
                <input type="date" />

                <label>From</label>
                <input type="date" />

                <label>To</label>
                <input type="date" />

                <label>Type</label>
                <select>
                    <option>(All)</option>
                </select>

                <label>Bank</label>
                <input />

            </div>

            <div className="bank-table">

                <table>
                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Cheque No</th>
                            <th>Bank</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td colSpan="5" className="empty">
                                No Data
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>
    );
}