import { createConnection } from 'typeorm';
import { UserMessage } from '../app/models/user-message.entity';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Sample data for test messages
const testMessages = [
  {
    name: 'Alice Smith',
    email: 'alice@example.com',
    message:
      'Hello! This is a test message from Alice. I would like to know more about your services.',
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    message:
      'Hey there! Just testing out the message system. Looks good so far!',
  },
  {
    name: 'Carol Davis',
    email: 'carol@example.com',
    message:
      'I have a question about your product. Can you please provide more details?',
  },
  {
    name: 'David Miller',
    email: 'david@example.com',
    message:
      'This is a sample message to test the pagination. Hope everything works well!',
  },
  {
    name: 'Eve Wilson',
    email: 'eve@example.com',
    message:
      'Just checking in to see how things are going. Let me know if you need any help!',
  },
  {
    name: 'Frank Taylor',
    email: 'frank@example.com',
    message:
      "Hi there! I'm interested in your services. Could you send me more information?",
  },
  {
    name: 'Grace Brown',
    email: 'grace@example.com',
    message:
      'Good afternoon! This is a test message from Grace. Looking forward to hearing back from you.',
  },
  {
    name: 'Henry Lee',
    email: 'henry@example.com',
    message:
      'This is message number 8 in our test set. Testing pagination functionality.',
  },
  {
    name: 'Ivy Clark',
    email: 'ivy@example.com',
    message:
      'Hello from Ivy! This is the 9th test message. Almost done with our testing.',
  },
  {
    name: 'Jack Adams',
    email: 'jack@example.com',
    message:
      'This is the final test message. Thanks for reading all these messages!',
  },
];

async function seedDatabase() {
  console.log('Seeding database with test messages...');

  const connection = await createConnection({
    type: 'mysql',
    host: process.env.APP_DB_HOST || 'localhost',
    port: parseInt(process.env.APP_DB_PORT || '3306'),
    username: process.env.APP_DB_USER || 'app',
    password: process.env.APP_DB_PASS || 'app',
    database: process.env.APP_DB_NAME || 'app',
    entities: [UserMessage],
    synchronize: false,
  });

  const userMessageRepository = connection.getRepository(UserMessage);

  // Clear existing messages
  await userMessageRepository.clear();
  console.log('Cleared existing messages.');

  // Insert test messages
  for (let i = 0; i < testMessages.length; i++) {
    const message = userMessageRepository.create(testMessages[i]);
    await userMessageRepository.save(message);
    console.log(`Inserted message ${i + 1}: ${testMessages[i].name}`);
  }

  console.log('All test messages inserted!');

  // Close connection
  await connection.close();
  console.log('Database connection closed.');
}

// Execute the seed function
seedDatabase()
  .then(() => {
    console.log('Database seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  });
