export type ErrorCode =
  | "missing"
  | "network"
  | "invalid"
  | "rate_limit"
  | "server"
  | "bad_response";

  export type MovieDetailsParams = { params: { id: string } }
