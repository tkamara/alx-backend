import redis from 'redis'
import util from 'util'

const client = redis.createClient();

client.on('connect', () => console.log('Redis client connected to the server'));

client.on('error', ()  => {
  console.log('Redis client not connected to the server: Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379');
});

const getValue = util.promisify(client.get).bind(client);

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
};

async function displaySchoolValue(schoolName) {
  const display = await getValue(schoolName);
  console.log(`${display}`);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
