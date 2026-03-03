import FormCard from "../../components/FormCard";
import FormInput from "../../components/FormField";

export default function Product() {
  return (
    <div className="two-column product-layout">

      <FormCard>
        <FormInput label="Code" />
        <FormInput label="Barcode" />
        <FormInput label="Model" />
        <FormInput label="Category" />
        <FormInput label="Product Name" />
        <FormInput label="Model Code" />
        <FormInput label="Brand" />
        <FormInput label="Colour Code" />
        <FormInput label="Colour" />
      </FormCard>

      <FormCard>
        <FormInput label="Lens Colour" />
        <FormInput label="Made By" />
        <FormInput label="Frame Type" />
        <FormInput label="Power" />
        <FormInput label="Cost" />
        <FormInput label="Rate" />
        <FormInput label="HSN Code" />
      </FormCard>

    </div>
  );
}