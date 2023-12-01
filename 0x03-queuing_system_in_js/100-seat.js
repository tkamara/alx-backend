const redis = require('redis');
const util = require('util');
const express = require('express');
const kue = require('kue');

const client = redis.createClient();
const app = express();
const queue = kue.createQueue();

const initialSeats = 50;

const setValue = util.promisify(client.set).bind(client);
setValue('available_seats', initialSeats);

async function reserveSeat(number) {
  await setValue('available_seats', number);
}

const getValue = util.promisify(client.get).bind(client);

async function getCurrentAvailableSeats() {
  const seats = await getValue('available_seats');
  return Number.parseInt(seats);
}

let reservationEnabled = true;

app.listen(1245, () => {
  console.log('Server is running');
});

app.get('/available_seats', (req, res) => {
  const seat = Number.parseInt(getCurrentAvailableSeats);
  res.send(JSON.stringify({ "numberOfAvailableSeats": Number.parseInt(seat) }));
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    res.send({ "status": "Reservation are blocked" });
  }

  const job = queue.create('reserve_seat');
  job
    .on('enqueue', () => {
      res.send({ "status": "Reservation in process" });
    })
    .on('error', () => {
      res.send({ "status": "Reservation failed" });
    })
    .on('complete', () => {
      console.log(`Seat reservation job ${job.id} completed`);
    })
    .on('failed', (err) => {
      console.log(`Seat reservation job ${job.id} failed: ${err}`);
    });

  job.save();

});

app.get('/process', (req, res) => {
  queue.process('reserve_seat', async(job, done) => {
    try {
      const curSeats = await Number.parseInt(getCurrentAvailableSeats());
      const newSeats = curSeats - 1;

      if (newSeats >= 0) {
        await reserveSeat(newSeats);
        if (newSeats === 0) {
          reservationEnabled = false;
        }
        done();
      } else {
        throw Error('Not enough seats available');
      }
    } catch (error) {
      done(error);
    }
  });

  res.send(JSON.stringify({ "status": "Queue processing" }));
});
