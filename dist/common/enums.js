"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentStatus = exports.PaymentStatus = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["PAID"] = "paid";
    OrderStatus["PROCESSING"] = "processing";
    OrderStatus["SHIPPED"] = "shipped";
    OrderStatus["COMPLETED"] = "completed";
    OrderStatus["CANCELLED"] = "cancelled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["PAID"] = "paid";
    PaymentStatus["FAILED"] = "failed";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var ShipmentStatus;
(function (ShipmentStatus) {
    ShipmentStatus["PREPARING"] = "preparing";
    ShipmentStatus["SHIPPED"] = "shipped";
    ShipmentStatus["DELIVERED"] = "delivered";
})(ShipmentStatus || (exports.ShipmentStatus = ShipmentStatus = {}));
//# sourceMappingURL=enums.js.map