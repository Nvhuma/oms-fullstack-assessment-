import { Input, Label } from "./ui.jsx";

/**
 * Standard text/date input row.
 */


export default function FormField({ label, ...props }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input {...props} />
    </div>
  );
}
