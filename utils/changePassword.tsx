export interface changePasswordResponseObject {
  message: string;
  isError: boolean;
}
export const changePasswordHandler = async (email: string) => {
  const response = await fetch("/api/changePassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    return;
  }
  const res = (await response.json()) as changePasswordResponseObject;

  return { message: res.message, isError: res.isError };
};
