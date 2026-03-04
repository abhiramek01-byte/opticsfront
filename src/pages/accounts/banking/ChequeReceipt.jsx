import "../../../styles/Banking.css";

export default function ChequeReceipt() {
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

            <div className="bank-form">

                <div className="row">
                    <label>No</label>
                    <input defaultValue="1" />

                    <label>Ref No</label>
                    <input defaultValue="1" />

                    <label>Date</label>
                    <input type="date" />
                </div>

                <div className="row">
                    <label>Debtor</label>
                    <input className="full" />
                </div>

                <div className="row">
                    <label>Creditor</label>
                    <input className="full" />
                </div>

                <div className="row">
                    <label>Amount</label>
                    <input />

                    <label>Cheque No</label>
                    <input />

                    <label>Date</label>
                    <input type="date" />
                </div>

                <div className="row">
                    <label>Description</label>
                    <input className="full" />
                </div>

            </div>

        </div>
    );
}