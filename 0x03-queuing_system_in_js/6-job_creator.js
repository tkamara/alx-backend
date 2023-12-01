const kue = require('kue');

const jobData = {
  phoneNumber : '0712345678',
  message: 'hello',
}

// creating queue 
const queue = kue.createQueue();

const job = queue.create('push_notification_code', jobData);

job
  .on('enqueue', () => {
    console.log('Notification job created:', job.id);
  })
  .on('complete', () => {
    console.log('Notification job completed');
  })
  .on('failed attempt', () => {
    console.log('Notification job failed');
  });

job.save();
