"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const IdSchema = z.object({
  id: z.string().uuid(),
});
type IdFormInput = z.input<typeof IdSchema>;

export default function IdOnlyTestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IdFormInput>({
    resolver: zodResolver(IdSchema),
    defaultValues: {
      id: typeof crypto !== "undefined" ? crypto.randomUUID() : "",
    },
  });

  const onValid = (data: IdFormInput) => {
    console.log("✅ valid:", data);
    alert("valid!");
    reset({ id: typeof crypto !== "undefined" ? crypto.randomUUID() : "" });
  };

  const onInvalid = (e: any) => {
    console.log("❌ invalid:", e);
    alert("invalid!");
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-2">
      <label className="block">
        <span className="text-sm">id (uuid)</span>
        <input
          {...register("id")}
          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>
      {errors.id?.message && (
        <p className="text-sm text-red-600">{String(errors.id.message)}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-black px-4 py-2 text-white"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
