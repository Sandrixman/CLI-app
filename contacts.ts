const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "../db/contacts.json");

type Contacts = {
  name: string;
  email: string;
  number: string;
  id?: string;
};

async function contactsList(): Promise<Contacts[]> {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId: string): Promise<Contacts | null> {
  const contacts = await contactsList();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId: string) {
  let contacts = await contactsList();
  contacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
}

async function addContact(contact: Contacts) {
  const contacts = await contactsList();
  const newContact = {
    ...contact,
    id: nanoid(),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
}

module.exports = {
  contactsList,
  getContactById,
  removeContact,
  addContact,
};
