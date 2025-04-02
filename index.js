import * as core from '@actions/core';
import * as github from '@actions/github';
import axios from 'axios';

async function run() {
  try {
    const taskId = core.getInput('task_id');
    const comment = core.getInput('comment');
    const htmlText = core.getInput('html_text');
    const authToken = core.getInput('auth_token');
    const dynamic = core.getInput('dynamic');
    const apiUrl = core.getInput('api_url');


    const context = github.context;
    const pullRequest = context.payload.pull_request;
    const pullRequestDescription = pullRequest?.body;
    const pullRequestAuthor = pullRequest?.user?.login;
    const pullRequestId = pullRequest?.number;
    const pullRequestName = pullRequest?.title;
    const pullRequestURL = pullRequest?.html_url;
    const pullRequestState = pullRequest?.state;
    const pullRequestMerged = pullRequest?.merged || false;

    const response = await axios.post(apiUrl, {
      task_id: taskId,
      comment: comment,
      html_text: htmlText,
      dynamic: dynamic,
      pullRequestDescription: pullRequestDescription,
      pullRequestAuthor: pullRequestAuthor,
      pullRequestId: pullRequestId,
      pullRequestName: pullRequestName,
      pullRequestURL: pullRequestURL,
      pullRequestState: pullRequestState,
      pullRequestMerged: pullRequestMerged,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    core.info('Comment added successfully!');
    core.setOutput('response', response.data);

  } catch (error) {
    core.info('Comment added failed!');
    core.info(error.message);
    core.setFailed(error.message);
  }
}

run();