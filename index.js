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

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      return console.log(contactsList);
    case "get":
      const contact = await contacts.getContactById(id);
      return console.log(contact);
    case "add":
      const addContact = await contacts.addContact({ name, email, phone });
      return console.log(addContact);
    case "remove":
      const newContacts = await contacts.removeContact(id);
      return console.log(newContacts);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
