import redis from 'redis'

const client = redis.createClient();

client.on('connect', () => console.log('Redis client connected to the server'));

client.on('error', ()  => {
  console.log('Redis client not connected to the server: Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379');
});

// subscribing to the channel
const channel = 'holberton school channel';
client.subscribe(channel);

client.on('message', (my_channel, message) => {
  if (my_channel === channel) {
    console.log(`${message}`);
  } else if (message === 'KILL_SERVER') {
    console.log(`${message}`);
    client.unsubscribe(channel);
    client.quit();
  }
});
