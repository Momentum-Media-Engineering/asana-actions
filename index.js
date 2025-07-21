import * as core from '@actions/core';
import * as github from '@actions/github';
import axios from 'axios';

async function run() {
  try {
    core.info('Starting the GitHub Asana Comment Action!');
    const context = github.context;

    //check the event action
    const eventAction = context.payload.action;
    const eventName = context.eventName;

    if (eventName === 'pull_request') {
       core.info(`Pull request event with action: ${eventAction || 'unknown'}`);
      if (eventAction === 'review_requested') {
        const requestedReviewer = context.payload.requested_reviewer?.login;
        core.info(`Review requested for: ${requestedReviewer}`);
      }
    }

    const taskId = core.getInput('task_id');
    const comment = core.getInput('comment');
    const htmlText = core.getInput('html_text');
    const authToken = core.getInput('auth_token');
    const dynamic = core.getInput('dynamic');
    const apiUrl = core.getInput('api_url');

    core.info(`Task ID: ${taskId}`);
    core.info(`Comment: ${comment}`);
    core.info(`HTML Text: ${htmlText}`);
    core.info(`Dynamic: ${dynamic}`);
    core.info(`API URL: ${apiUrl}`);


    const pullRequest = context.payload.pull_request;
    const pullRequestDescription = pullRequest?.body;
    const pullRequestAuthor = pullRequest?.user?.login;
    const pullRequestId = pullRequest?.number;
    const pullRequestName = pullRequest?.title;
    const pullRequestURL = pullRequest?.html_url;
    const pullRequestState = pullRequest?.state;
    const pullRequestMerged = pullRequest?.merged || false;
    const requestedReviewer = context.payload.requested_reviewer?.login;

    core.info(`Pull Request Description: ${pullRequestDescription}`);
    core.info(`Pull Request Author: ${pullRequestAuthor}`);
    core.info(`Pull Request ID: ${pullRequestId}`);
    core.info(`Pull Request Name: ${pullRequestName}`);
    core.info(`Pull Request URL: ${pullRequestURL}`);
    core.info(`Pull Request State: ${pullRequestState}`);
    core.info(`Pull Request Merged: ${pullRequestMerged}`);
    core.info(`Requested Reviewer: ${requestedReviewer}`);

    const response = await axios.post(apiUrl, {
      task_id: taskId,
      comment: comment,
      html_text: htmlText,
      dynamic: dynamic,
      pullRequestEventAction: eventAction,
      pullRequestEventName: eventName,
      pullRequestDescription: pullRequestDescription,
      pullRequestAuthor: pullRequestAuthor,
      pullRequestId: pullRequestId,
      pullRequestName: pullRequestName,
      pullRequestURL: pullRequestURL,
      pullRequestState: pullRequestState,
      pullRequestMerged: pullRequestMerged,
      requestedReviewer: requestedReviewer,

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