import { fetchPlaceholders, getMetadata } from '../../scripts/aem.js';

async function createTableWithPlaceholder(table) {
  const locale = getMetadata('locale');
  const placeholders = await fetchPlaceholders(locale);
  const {
    fnameKey,
    lnameKey,
    roleKey,
    orgKey,
    cntryKey,
    header,
    firstName,
    lastName,
    role,
    organization,
    country,
  } = placeholders;

  // Header Row
  const authorRow = document.createElement('tr');
  const authorCol = document.createElement('th');
  authorCol.colSpan = 2;
  authorCol.appendChild(document.createTextNode(header));
  authorRow.append(authorCol);

  // First Name Row
  const firstNameRow = document.createElement('tr');
  const firstNameCol1 = document.createElement('td');
  firstNameCol1.appendChild(document.createTextNode(fnameKey));
  const firstNameCol2 = document.createElement('td');
  firstNameCol2.appendChild(document.createTextNode(firstName));
  firstNameRow.append(firstNameCol1, firstNameCol2);

  // Last Name Row
  const lastNameRow = document.createElement('tr');
  const lastNameCol1 = document.createElement('td');
  lastNameCol1.appendChild(document.createTextNode(lnameKey));
  const lastNameCol2 = document.createElement('td');
  lastNameCol2.appendChild(document.createTextNode(lastName));
  lastNameRow.append(lastNameCol1, lastNameCol2);

  // Role Row
  const roleRow = document.createElement('tr');
  const roleCol1 = document.createElement('td');
  roleCol1.appendChild(document.createTextNode(roleKey));
  const roleCol2 = document.createElement('td');
  roleCol2.appendChild(document.createTextNode(role));
  roleRow.append(roleCol1, roleCol2);

  // Organization Row
  const orgRow = document.createElement('tr');
  const orgCol1 = document.createElement('td');
  orgCol1.appendChild(document.createTextNode(orgKey));
  const orgCol2 = document.createElement('td');
  orgCol2.appendChild(document.createTextNode(organization));
  orgRow.append(orgCol1, orgCol2);

  // Country Row
  const cntryRow = document.createElement('tr');
  const cntryCol1 = document.createElement('td');
  cntryCol1.appendChild(document.createTextNode(cntryKey));
  const cntryCol2 = document.createElement('td');
  cntryCol2.appendChild(document.createTextNode(country));
  cntryRow.append(cntryCol1, cntryCol2);

  // Table me rows append karna
  table.append(authorRow, firstNameRow, lastNameRow, roleRow, orgRow, cntryRow);
}

export default async function decorate(block) {
  const table = document.createElement('table');
  table.classList.add('author-table');
  await createTableWithPlaceholder(table);
  block.replaceChildren(table);
}
