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
const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");
program.parse(process.argv);
const argv = program.opts();
const invokeAction = ({ action, id, name, email, phone }) => __awaiter(void 0, void 0, void 0, function* () {
    switch (action) {
        case "list":
            const contactsList = yield contacts.contactsList();
            return console.log(contactsList);
        case "get":
            const contact = yield contacts.getContactById(id);
            return console.log(contact);
        case "add":
            const addContact = yield contacts.addContact({ name, email, phone });
            return console.log(addContact);
        case "remove":
            const deletedContacts = yield contacts.removeContact(id);
            return console.log(deletedContacts);
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
});
invokeAction(argv);
