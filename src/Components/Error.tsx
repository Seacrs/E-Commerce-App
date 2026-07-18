import { useRouteError, Navigate, isRouteErrorResponse } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  const getErrorMessage = (): string => {
    if (isRouteErrorResponse(error)) {
      return `${error.status} - ${error.statusText}`;
    }
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === "string") {
      return error;
    }
    return "Unknown error";
  };

  return (
    <div className="p-5 m-5">
      <h1 className="text-3xl font-bold">An error occurred</h1>
      <p className="text-red-400 text-xl">{getErrorMessage()}</p>
      <Navigate to="/" replace />
    </div>
  );
}
