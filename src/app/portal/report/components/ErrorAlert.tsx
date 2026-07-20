"use client";

type ErrorAlertProps = {
  message?: string;
  };

  export default function ErrorAlert({
    message,
    }: ErrorAlertProps) {
      if (!message) return null;

        return (
            <div className="mb-6 rounded-xl border border-red-700 bg-red-950/30 p-4 text-red-300">
                  {message}
                      </div>
                        );
                        }