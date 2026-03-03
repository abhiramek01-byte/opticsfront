export default function FormField({ label, type = "text" }) {
  return (
    <div className="form-field">
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea />
      ) : (
        <input type={type} />
      )}
    </div>
  );
}