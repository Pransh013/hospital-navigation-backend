import { TokenPayload } from "../utils";

declare global {
  namespace Express {
    interface Request {
      patient?: TokenPayload;
    }
  }
}
