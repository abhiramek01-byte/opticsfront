import FormCard from "../../components/FormCard";
import FormInput from "../../components/FormInput";

export default function MadeBy() {
  return (
    <FormCard>
      <FormInput label="Code" />
      <FormInput label="Name" />
    </FormCard>
  );
}