const { Command } = require("commander");
const program = new Command();
const { listContacts, getContactById, removeContact, addContact } = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        listContacts().then(data => console.log(data));
        break;

      case "get":
        getContactById(parseInt(id)).then(data => console.log(data));
        break;

      case "add":
        addContact(name, email, phone);
        break;

      case "remove":
        removeContact(parseInt(id));
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error.message);
  }
}

invokeAction(argv);
