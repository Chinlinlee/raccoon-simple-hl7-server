"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proto = void 0;
class Proto {
    constructor() {
        this.stack = [];
    }
    use(fn) {
        const handle = fn;
        this.stack.push({ handle });
    }
    _handle(req, res) {
        let index = 0;
        const next = (err) => {
            const layer = this.stack[index++];
            if (!layer)
                return;
            call(layer.handle, err, req, res, next);
        };
        next();
    }
}
exports.Proto = Proto;
function call(handle, err, req, res, next) {
    const arity = handle.length;
    let error = err;
    const hasError = Boolean(err);
    try {
        if (hasError && arity === 4) {
            handle(err, req, res, next);
            return;
        }
        else if (!hasError && arity < 4) {
            handle(req, res, next);
            return;
        }
    }
    catch (e) {
        error = e;
    }
    next(error);
}
