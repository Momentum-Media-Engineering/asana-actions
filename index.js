const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const taskId = core.getInput('task_id');
    const comment = core.getInput('comment');
    const htmlText = core.getInput('html_text');
    const authToken = core.getInput('auth_token');

    const response = await axios.post('https://asana.momentummedia.com.au/api/v1/add-comment', {
      task_id: taskId,
      comment: comment,
      html_text: htmlText,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    core.info('Comment added successfully!');
    core.setOutput('response', response.data);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();