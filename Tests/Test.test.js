const axios = require('axios');
const { baseURL } = require('../test.config.js'); // Importing the base URL
const { expect } = require('chai');

describe('User Service Integration Tests', () => {
  it('should create a new user', async () => {
    // Payload for user creation
    const userData = 
    { 
      email: 'JonDoe@gmail.com',
      password: 'qwerty@123',
      code: 'AccessCodeString',
      platform: 'Windows',
      timezone: 'UTC',
    };

    // Call the user service method
    const newUser = await axios.post(`${baseURL}/user/new`, userPayload);

    // Perform assertions
    expect(newUser).to.have.property('id');
    expect(newUser).to.have.status(201);

   var UserID =  expect(newUser).to.have.property('id').toString;
  });

  describe('Message Service Integration Tests', () => {
    it('should send a new message for a user', async () => {
      // Set up test data and dependencies
      const messageData = {
        user: UserID,
        message: 'Hello, Woebot!',
      };
  
      // Call the message service method to send a new message
      const sentMessage = await messageService.sendMessage(messageData);
  
      // Perform assertions
      expect(sentMessage.message).to.equal(messageData.message);
      expect(sentMessage).to.have.status(200);
    });

  });
  
});