"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrLinkContact = void 0;
const db_1 = require("../database/db");
const contact_1 = require("../models/contact");
const createOrLinkContact = async (req, res) => {
    const { email, phoneNumber } = req.body;
    if (!email && !phoneNumber) {
        return res.status(400).json({ error: "Email or phoneNumber is required." });
    }
    const contactRepo = db_1.AppDataSource.getRepository(contact_1.Contact);
    const existingContacts = await contactRepo.find({
        where: [
            { email: email ?? null },
            { phoneNumber: phoneNumber?.toString() ?? null },
        ],
        withDeleted: true,
    });
    if (existingContacts.length === 0) {
        const newContact = contactRepo.create({
            email,
            phoneNumber: phoneNumber?.toString(),
            linkPrecedence: "primary",
        });
        const saved = await contactRepo.save(newContact);
        return res.json({
            contact: {
                primaryContatctId: saved.id,
                emails: [saved.email],
                phoneNumbers: [saved.phoneNumber],
                secondaryContactIds: [],
            },
        });
    }
    const primaryContact = existingContacts.reduce((prev, curr) => curr.linkPrecedence === "primary" &&
        (!prev || curr.createdAt < prev.createdAt)
        ? curr
        : prev);
    const isNewInfo = !existingContacts.some((c) => c.email === email) ||
        !existingContacts.some((c) => c.phoneNumber === phoneNumber?.toString());
    let newSecondaryContact = null;
    if (isNewInfo) {
        newSecondaryContact = contactRepo.create({
            email,
            phoneNumber: phoneNumber?.toString(),
            linkPrecedence: "secondary",
            linkedId: primaryContact.id,
        });
        await contactRepo.save(newSecondaryContact);
    }
    const allLinkedContacts = await contactRepo.find({
        where: [
            { id: primaryContact.id },
            { linkedId: primaryContact.id },
        ],
    });
    const emails = Array.from(new Set(allLinkedContacts.map((c) => c.email).filter(Boolean)));
    const phoneNumbers = Array.from(new Set(allLinkedContacts.map((c) => c.phoneNumber).filter(Boolean)));
    const secondaryIds = allLinkedContacts
        .filter((c) => c.linkPrecedence === "secondary")
        .map((c) => c.id);
    return res.json({
        contact: {
            primaryContatctId: primaryContact.id,
            emails,
            phoneNumbers,
            secondaryContactIds: secondaryIds,
        },
    });
};
exports.createOrLinkContact = createOrLinkContact;
