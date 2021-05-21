const fs = require('fs')
const bcrypt = require('bcrypt');
const CSVToJSON = require('csvtojson');

/**
 * @description return a word from wordlist
 * @returns word
 */
const getWordList = () => {
  try {
    const data = fs.readFileSync(FileName, 'utf8'); // Add name of File name

    const dataArray = data.split('\n');
    return dataArray;
  } catch (err) {
    console.error(err)
  }
}

/**
 * @description convert CSV file to JSON, compare the generated hash with all of the hashes in excel file and see if any hash matches
 * @returns Matched users.
 */
async function readCSVFileAndCompare(wordList) {
  const foundUsers = [];

  const users = await CSVToJSON().fromFile(FileName); // Add name of file, which you want to compare
  wordList.forEach(word => {
    console.log('[TESTING FOR WORD]', word);
    users.forEach((user) => {
      if (bcrypt.compareSync(word, user.password))
        foundUsers.push({ ...user, password: word });
    });
  });
  console.log(foundUsers);
}

const wordList = getWordList();
readCSVFileAndCompare(wordList);
