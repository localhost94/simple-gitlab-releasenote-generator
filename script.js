const axios = require('axios');
require('dotenv').config();

// Load environment variables from a .env file
const { PRIVATE_TOKEN, PROJECT_ID, START_COMMIT_ID, END_COMMIT_ID, GITLAB_API_URL } = process.env;

// Function to get commit messages from a single page
const getCommitMessages = async (pageUrl) => {
  try {
    const response = await axios.get(pageUrl, {
      headers: {
        'PRIVATE-TOKEN': PRIVATE_TOKEN,
      },
    });
    // console.log(response.data);

    return response.data.commits;
  } catch (error) {
    console.error('Error fetching commit messages:', error.message);
    return [];
  }
};

// Function to get commit messages between two commit IDs
const getCommitMessagesBetweenCommits = async () => {
  const apiEndpoint = `/projects/${PROJECT_ID}/repository/compare?from=${START_COMMIT_ID}&to=${END_COMMIT_ID}`;
  const apiURL = `${GITLAB_API_URL}${apiEndpoint}`;

  try {
    const commitMessages = await getCommitMessages(apiURL);
    // console.log(commitMessages);

    // Store commit messages in a variable (array)
    const commitMessagesArray = commitMessages.map((commit, index) => ({
      id: commit.id,
      number: index + 1,
      title: commit.title,
      message: commit.message,
    }));

    // Print or use the commitMessagesArray as needed
    // console.debug(commitMessagesArray);
    // Print each commit on a single line
    commitMessages.forEach((commit, index) => {
      console.log(`${index + 1}. ${commit.message.replace(/\n/g, ' ')}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Run the script
getCommitMessagesBetweenCommits();
