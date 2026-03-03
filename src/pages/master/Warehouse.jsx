import PageLayout from "../../components/PageLayout";
import FormCard from "../../components/FormCard";
import FormField from "../../components/FormField";

export default function Warehouse() {
  return (
    <PageLayout title="Warehouse">

      <div className="grid-2">

        <FormCard>
          <FormField label="Code" />
          <FormField label="Barcode" />
          <FormField label="Model" />
          <FormField label="Category" />
          <FormField label="Product Name" />
          <FormField label="Model Code" />
          <FormField label="Brand" />
          <FormField label="Colour Code" />
          <FormField label="Colour" />
        </FormCard>

        <FormCard>
          <FormField label="Lens Colour" />
          <FormField label="Made By" />
          <FormField label="Frame Type" />
          <FormField label="Power" />
          <FormField label="Cost" />
          <FormField label="Rate" />
          <FormField label="Tax Group" />
          <FormField label="HSN Code" />
        </FormCard>

      </div>

    </PageLayout>
  );
}