const fs = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    return JSON.parse(await fs.readFile(contactsPath, "utf8"));
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const findContact = contacts.find(item => item.id === contactId);
    if (findContact) {
      return findContact;
    } else {
      throw new Error("Error in GetContactById function");
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactsList = contacts.filter(item => item.id !== contactId);
    if (contactsList.length === contacts.length) {
      throw new Error("Nothing to delete");
    }
    const parsedContacts = JSON.stringify(contactsList);
    await fs.writeFile(contactsPath, parsedContacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contact = await listContacts();
    const contactsList = [...contact, { id: uuid(), name, email, phone }];
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
