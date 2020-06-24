"use strict";
/// <reference path="./paper.d.ts" />
/// <reference path="./assistant.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var TestMode = /** @class */ (function () {
    function TestMode() {
    }
    TestMode.prototype.onMouseDown = function (state, event) {
        console.log("Ts onMouseDown called");
    };
    return TestMode;
}());
exports.TestMode = TestMode;
