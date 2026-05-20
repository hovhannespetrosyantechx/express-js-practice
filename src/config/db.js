const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/todos.json')
async function readDB() {
  const rawData = await fs.promises.readFile(filePath, 'utf-8')
  const data = JSON.parse(rawData)
  return data
}

async function writeDB(data) {
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2))
}

module.exports = { readDB, writeDB }
