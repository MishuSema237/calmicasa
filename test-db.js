const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local since we can't rely on 'next' or 'dotenv' being loaded in this standalone script
function loadEnv() {
    try {
        const envPath = path.join(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            envContent.split('\n').forEach(line => {
                const match = line.match(/^([^=]+)=(.*)$/);
                if (match) {
                    const key = match[1].trim();
                    const value = match[2].trim().replace(/^["']|["']$/g, ''); // Remove quotes
                    process.env[key] = value;
                }
            });
        }
    } catch (e) {
        console.error('Error loading .env.local:', e.message);
    }
}

loadEnv();

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('❌ MONGODB_URI not found in .env.local');
    process.exit(1);
}

console.log('Testing connection to MongoDB...');
// Mask the password for logging
const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
console.log(`Target: ${maskedUri}`);

async function testConnection() {
    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000, // Fail fast after 5s
        connectTimeoutMS: 5000,
    });

    try {
        console.log('Attempting to connect...');
        await client.connect();
        console.log('✅ Successfully connected to MongoDB!');

        const db = client.db('calmicasa');
        console.log('Pinging database...');
        await db.command({ ping: 1 });
        console.log('✅ Database ping successful!');

    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        if (error.reason) {
            console.error('Reason:', error.reason);
        }
    } finally {
        await client.close();
    }
}

testConnection();
