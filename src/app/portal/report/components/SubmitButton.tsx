"use client";

type SubmitButtonProps = {
  loading: boolean;
  editing?: boolean;
};

export default function SubmitButton({
  loading,
  editing = false,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-bold text-white transition duration-300 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading
        ? editing
          ? "Saving..."
          : "Submitting..."
        : editing
        ? "Save Changes"
        : "Submit Weekly Report"}
    </button>
  );
}