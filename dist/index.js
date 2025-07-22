"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./database/db");
const routes_1 = __importDefault(require("./routes/routes"));
db_1.AppDataSource.initialize()
    .then(() => {
    console.log("✅ Database connection established");
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("", routes_1.default);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("❌ Failed to connect to the database:", err);
});
