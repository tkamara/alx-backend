import redis from 'redis'

const client = redis.createClient();

client.on('connect', () => console.log('Redis client connected to the server'));

client.on('error', ()  => {
  console.log('Redis client not connected to the server: Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379');
});

const Holberton_Schools = "HolbertonSchools"

client.hset(Holberton_Schools, "Portland", "50", redis.print);
client.hset(Holberton_Schools, "Seattle", "80", redis.print);
client.hset(Holberton_Schools, "New York", "20", redis.print);
client.hset(Holberton_Schools, "Bogota", "20", redis.print);
client.hset(Holberton_Schools, "Cali", "40", redis.print);
client.hset(Holberton_Schools, "Paris", "2", redis.print);

const data =  client.hgetall(Holberton_Schools);
console.log(data);
