import { Hl7Request } from "./request";
import { Hl7Response } from "./response";

interface NextFunction {
    (err? : any) : void
}

export type MiddlewareHandle = (
    req: Hl7Request,
    res: Hl7Response,
    next: NextFunction
) => void;
export type ErrorMiddlewareHandle = (
    err: any,
    req: Hl7Request,
    res: Hl7Response,
    next: NextFunction
) => void;

interface Layer {
    handle: MiddlewareHandle | ErrorMiddlewareHandle;
}

export class Proto {
    private stack: Layer[] = [];

    constructor() {}

    use(fn: MiddlewareHandle | ErrorMiddlewareHandle): void {
        const handle = fn;
        this.stack.push({ handle });
    }

    _handle(req: Hl7Request, res: Hl7Response): void {
        let index = 0;

        const next: NextFunction = (err?: Error) => {
            const layer = this.stack[index++];

            if (!layer) return;

            call(layer.handle, err, req, res, next);
        };

        next();
    }
}

function call(
    handle: MiddlewareHandle | ErrorMiddlewareHandle,
    err: Error | undefined,
    req: Hl7Request,
    res: Hl7Response,
    next: NextFunction
): void {
    const arity = handle.length;
    let error = err;
    const hasError = Boolean(err);
    try {
        if (hasError && arity === 4) {
            console.log("error middle");
            (handle as ErrorMiddlewareHandle)(err!, req, res, next);
            return;
        } else if (!hasError && arity < 4) {
            console.log("middle");
            (handle as MiddlewareHandle)(req, res, next);
            return;
        }
    } catch (e) {
        error = e as Error;
    }

    next(error);
}
