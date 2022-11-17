const fs = require('fs').promises;
const path = require('path');
const { v4: genId } = require('uuid');

const contactPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const fileData = await fs.readFile(contactPath);
    const contacts = JSON.parse(fileData);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const wantedContact = contacts.find(contact => contact.id === contactId);
    return wantedContact;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactPath, JSON.stringify(updatedContacts));
    return await listContacts();
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: genId(), name, email, phone };
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactPath, JSON.stringify(updatedContacts));
    return await listContacts();
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
