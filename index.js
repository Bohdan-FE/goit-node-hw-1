import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";
import { program } from "commander";

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.log(allContacts);
      break;
    case "get":
      const contact = await getContactById(id);
      console.log(contact);
      break;
    case "add":
      const updateContact = await addContact({ name, email, phone });
      console.log(updateContact);
      break;
    case "remove":
      const deleteContact = await removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program.option('--action <type>')
    .option('--id <type>')
    .option('--name <type>')
    .option('--email <type>')
    .option('--phone <type>')

program.parse()
const options = program.opts()

invokeAction(options)

