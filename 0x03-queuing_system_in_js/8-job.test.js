const kue = require('kue');
const { expect } = require('chai');
const createPushNotificationsJobs = require('./8-job');

const queue = kue.createQueue();

beforeEach(() => {
  queue.testMode.enter();
});

afterEach(() => {
  queue.testMode.clear();
  queue.testMode.exit();
});

describe('createPushNotificationsJobs', () => {
  it('create two new jobs to the queue', () => {
    createPushNotificationsJobs(queue);
    const jobs = queue.testMode.jobs;
    expect(jobs.length).to.equal(2);
  });
});
