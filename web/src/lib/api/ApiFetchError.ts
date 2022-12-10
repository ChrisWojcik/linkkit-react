export class ApiFetchError extends Error {
  public status: number;
  public response: Response;

  constructor(message: string, response: Response) {
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiFetchError);
    }

    this.name = 'ApiFetchError';
    this.status = response.status || 500;
    this.response = response;
  }
}
