import PageLayout from "../../components/PageLayout";

export default function TaxGroup() {
  return (
    <PageLayout title="Tax Group">

      <div className="form-card small-card">

        <div className="form-row">
          <label>Code</label>
          <input type="text" />
        </div>

        <div className="form-row">
          <label>Name</label>
          <input type="text" />
        </div>

        <div className="form-row">
          <label>Tax</label>
          <input type="text" />
          <label>CESS</label>
          <input type="text" />
        </div>

      </div>

    </PageLayout>
  );
}