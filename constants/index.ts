export const errorMap: Record<string, string> = {
  missing: "Please fill username and password.",
  invalid: "Invalid credentials.",
  rate_limit: "Too many attempts. Please try again shortly.",
  network: "Cannot reach the login server.",
  server: "Server error. Please try again.",
  bad_response: "Unexpected response from auth server.",
};
