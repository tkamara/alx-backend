const kue = require('kue');

const queue = kue.createQueue();

export default function createPushNotificationsJobs(jobs, queue) {
  if (Array.isArray(jobs)) {
    for (const job in jobs) {
      const jobNew = queue.create('push_notification_code_3', job);
      jobNew.on('enqueue', () => {
        console.log('Notification job created:', jobNew.id);
      });
      jobNew.on('complete', () => {
        console.log(`Notification job ${jobNew.id} completed`);
      });
      jobNew.on('progress', (progress) => {
        console.log(`Notification job ${jobNew.id} ${progress} complete`);
      });
      jobNew.on('failed', (err) => {
        console.log(`Notification job ${jobNew.id} failed: ${err}`);
      });
    };
  } else {
    throw new Error('Jobs is not an array');
  };
}
