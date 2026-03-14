import "../../styles/Tools.css";

export default function BarcodeDesigner() {
    return (
        <div className="tool-page">

            <div className="tool-header">
                <h2>Barcode Designer</h2>
            </div>

            <div className="barcode-form">

                <div className="form-row">
                    <label>Name</label>
                    <input type="text" />

                    <label>Encoded Format</label>
                    <input type="text" />
                </div>

                <div className="form-row">
                    <label>Printer</label>
                    <input type="text" />

                    <label>Font Size</label>
                    <input type="number" />
                </div>

                <div className="barcode-table">

                    <table>
                        <thead>
                            <tr>
                                <th>Start Character</th>
                                <th>Description</th>
                                <th>Type</th>
                                <th>Encode</th>
                                <th>End Character</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>-</td>
                                <td></td>
                                <td>(None)</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div className="tool-buttons">
                    <button>Import</button>
                    <button>Copy</button>
                    <button className="save">Save</button>
                    <button>Clear</button>
                </div>

            </div>

        </div>
    );
} 