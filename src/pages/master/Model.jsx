import PageLayout from "../../components/PageLayout";

export default function Model() {
  return (
    <PageLayout title="Model">

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
          <label>Type</label>
          <select>
            <option>Lens</option>
            <option>Frame</option>
          </select>

          <label>
            <input type="checkbox" />
            Expiry
          </label>

          <label>
            <input type="checkbox" />
            Non Stock Item
          </label>
        </div>

      </div>

    </PageLayout>
  );
}