import PageLayout from "../../components/PageLayout";
import FormCard from "../../components/FormCard";
import FormField from "../../components/FormField";

export default function ColourCode() {
  return (
    <PageLayout title="Colour Code">
      <FormCard>
        <FormField label="Code" />
        <FormField label="Name" />
      </FormCard>
    </PageLayout>
  );
}