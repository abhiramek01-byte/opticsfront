import PageLayout from "../../components/PageLayout";

export default function Vendor() {
  return (
    <PageLayout title="Vendor">

      <div className="grid-2">

        {/* LEFT PANEL */}
        <div className="form-card">
          <div className="form-row">
            <label>Code</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Name</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Opening Balance</label>
            <input type="text" />
            <select>
              <option>Debit</option>
              <option>Credit</option>
            </select>
          </div>

          <h4>Address</h4>

          <div className="form-row">
            <label>Name</label>
            <input type="text" />
          </div>

          <div className="form-row vertical">
            <label>Address</label>
            <textarea rows="4"></textarea>
          </div>

          <div className="form-row">
            <label>Place</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Phone</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Mobile No</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Web</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Fax</label>
            <input type="text" />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="form-card">
          <h4>Others</h4>

          <div className="form-row">
            <label>Contact Person</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Credit Limit</label>
            <input type="text" />
            <label>Due Days</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>TIN</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>CST</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>DL Nos.</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>GST</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Payment Terms</label>
            <input type="text" />
          </div>

          <div className="form-row vertical">
            <label>Remark</label>
            <textarea rows="4"></textarea>
          </div>
        </div>

      </div>

    </PageLayout>
  );
}