"use client";

type SuccessAlertProps = {
  message: string;
  };

  export default function SuccessAlert({
    message,
    }: SuccessAlertProps) {
      if (!message) return null;

        return (
            <div className="mb-6 rounded-xl border border-green-700 bg-green-950/30 p-4 text-green-300">
                  {message}
                      </div>
                        );
                        }