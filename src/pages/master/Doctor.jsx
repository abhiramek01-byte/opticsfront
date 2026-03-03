import PageLayout from "../../components/PageLayout";

export default function Doctor() {
  return (
    <PageLayout title="Doctor">

      <div className="form-card">

        <div className="form-row">
          <label>Code</label>
          <input type="text" />
        </div>

        <div className="form-row">
          <label>Name</label>
          <input type="text" />
        </div>

        <div className="form-row vertical">
          <label>Address</label>
          <textarea rows="4"></textarea>
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

      </div>

    </PageLayout>
  );
}