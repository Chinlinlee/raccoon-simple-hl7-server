import { Hl7Request } from "./request";
import { Hl7Response } from "./response";
interface NextFunction {
    (err?: any): void;
}
export type MiddlewareHandle = (req: Hl7Request, res: Hl7Response, next: NextFunction) => void;
export type ErrorMiddlewareHandle = (err: any, req: Hl7Request, res: Hl7Response, next: NextFunction) => void;
export declare class Proto {
    private stack;
    constructor();
    use(fn: MiddlewareHandle | ErrorMiddlewareHandle): void;
    _handle(req: Hl7Request, res: Hl7Response): void;
}
export {};
