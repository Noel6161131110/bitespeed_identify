"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const identify_1 = require("../controllers/identify");
const router = (0, express_1.Router)();
router.post("/identify", identify_1.createOrLinkContact);
exports.default = router;
