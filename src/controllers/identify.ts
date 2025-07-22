import { Request, Response } from "express";
import { AppDataSource } from "../database/db";
import { Contact } from "../models/contact";

export const createOrLinkContact = async (req: Request, res: Response) => {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
        return res.status(400).json({ error: "Email or phoneNumber is required." });
    }

    const contactRepo = AppDataSource.getRepository(Contact);


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

    const primaryContacts = existingContacts.filter(c => c.linkPrecedence === "primary");

    const truePrimary = primaryContacts.sort((a, b) =>
        a.createdAt.getTime() - b.createdAt.getTime()
    )[0];

    for (const contact of primaryContacts) {
        if (contact.id !== truePrimary.id) {
            contact.linkPrecedence = "secondary";
            contact.linkedId = truePrimary.id;
            await contactRepo.save(contact);
        }
    }

    const isNewEmail = email && !existingContacts.some(c => c.email === email);
    const isNewPhone = phoneNumber && !existingContacts.some(c => c.phoneNumber === phoneNumber?.toString());

    if (isNewEmail || isNewPhone) {
        const newSecondaryContact = contactRepo.create({
            email,
            phoneNumber: phoneNumber?.toString(),
            linkPrecedence: "secondary",
            linkedId: truePrimary.id,
        });
        await contactRepo.save(newSecondaryContact);
    }

    const allLinkedContacts = await contactRepo.find({
        where: [
            { id: truePrimary.id },
            { linkedId: truePrimary.id },
        ],
    });

    const emails = Array.from(
        new Set(allLinkedContacts.map((c) => c.email).filter(Boolean))
    );

    const phoneNumbers = Array.from(
        new Set(allLinkedContacts.map((c) => c.phoneNumber).filter(Boolean))
    );

    const secondaryIds = allLinkedContacts
        .filter((c) => c.linkPrecedence === "secondary")
        .map((c) => c.id);



    return res.json({
        contact: {
            primaryContactId: truePrimary.id,
            emails,
            phoneNumbers,
            secondaryContactIds: secondaryIds,
        },
    });
};