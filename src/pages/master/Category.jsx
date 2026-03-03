import PageLayout from "../../components/PageLayout";
import FormCard from "../../components/FormCard";
import FormField from "../../components/FormField";

export default function Category() {
  return (
    <PageLayout title="Category">
      <FormCard>
        <FormField label="Code" />
        <FormField label="Name" />
      </FormCard>
    </PageLayout>
  );
}