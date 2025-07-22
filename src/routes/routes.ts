import { Router } from 'express';
import { createOrLinkContact } from "../controllers/identify";

const router = Router();

router.post("/identify", createOrLinkContact);

export default router;