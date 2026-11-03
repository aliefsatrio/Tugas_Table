"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.round2 = exports.DecimalTransformer = void 0;
exports.DecimalTransformer = {
    to: (value) => value,
    from: (value) => value === null || value === undefined ? value : parseFloat(value),
};
const round2 = (n) => Math.round(n * 100) / 100;
exports.round2 = round2;
//# sourceMappingURL=decimal.transformer.js.map