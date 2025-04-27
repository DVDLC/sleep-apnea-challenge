interface AuthServiceI {
  login(requestBody: unknown): Promise<unknown>;
}

export class AuthService implements AuthServiceI {
  login(requestBody: unknown): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
}
