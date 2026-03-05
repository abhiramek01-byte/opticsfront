import "../../styles/Tools.css";

export default function BulkMessage() {

    return (

        <div className="tool-page">

            <h2>Bulk Message</h2>

            <div className="bulk-layout">

                <div className="customer-list">

                    <table>

                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Mobile No</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>John Doe</td>
                                <td>9876543210</td>
                            </tr>
                        </tbody>

                    </table>

                </div>

                <div className="message-box">

                    <textarea placeholder="Type message here..."></textarea>

                    <div className="bulk-buttons">
                        <button>Cancel</button>
                        <button>Clear</button>
                        <button className="send">Send</button>
                    </div>

                </div>

            </div>

        </div>
    );
}