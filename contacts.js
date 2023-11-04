import fs from 'fs/promises'
import path from 'path'
import { nanoid } from 'nanoid'

const contactsPaths = path.resolve('db', 'contacts.json')


export async function listContacts() {
    const result = await fs.readFile(contactsPaths)
    return JSON.parse(result)
}

export async function getContactById(contactId) {
    const contacts = await listContacts()
    const result = contacts.find(obj => obj.id === contactId)
    return result || null

}

export async function removeContact(contactId) {
    const contacts = await listContacts()
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPaths, JSON.stringify(contacts, null, 2))
    return result;
}

export async function addContact({ name, email, phone }) {
    const contacts = await listContacts()
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    contacts.push(newContact) 
    await fs.writeFile(contactsPaths, JSON.stringify(contacts, null, 2))
    return newContact
}