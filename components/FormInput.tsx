export default function FormInput({ type }: { type: "username" | "password" }) {
  return (
    <label className="block">
      <span className="text-sm capitalize">{type}</span>
      <input
        name={type}
        type={type}
        required
        className="mt-1 w-full rounded-md border p-2"
      />
    </label>
  );
}
