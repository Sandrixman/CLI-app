"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "../db/contacts.json");
function contactsList() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fs.readFile(contactsPath);
        return JSON.parse(data);
    });
}
function getContactById(contactId) {
    return __awaiter(this, void 0, void 0, function* () {
        const contacts = yield contactsList();
        return contacts.find((contact) => contact.id === contactId) || null;
    });
}
function removeContact(contactId) {
    return __awaiter(this, void 0, void 0, function* () {
        let contacts = yield contactsList();
        contacts = contacts.filter((contact) => contact.id !== contactId);
        yield fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return contacts;
    });
}
function addContact(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const contacts = yield contactsList();
        const newContact = Object.assign(Object.assign({}, contact), { id: nanoid() });
        contacts.push(newContact);
        yield fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return contacts;
    });
}
module.exports = {
    contactsList,
    getContactById,
    removeContact,
    addContact,
};
