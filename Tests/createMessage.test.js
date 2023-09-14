const axios = require('axios');
const { baseURL } = require('../test.config.js'); // Importing the base URL
const { expect } = require('chai');
const chai = require("chai");
const expect = require("chai").expect;
const faker = require('faker');

// Generate a random email address
const randomEmail = faker.internet.email();

var generator = require('generate-password');

var password = generator.generate({
	length: 10,
	numbers: true
});

before('User Service Integration Tests', () => {
  it('create a new user', async () => {
    // Payload for user creation
    const userData = 
    { 
      email: randomEmail,
      password: password,
      code: 'AccessCodeString',
      platform: 'Windows',
      timezone: 'UTC',
    };

    // Call the user service method
    const newUser = await axios.post(`${baseURL}/user/new`, userData);

    // Perform assertions
    expect(newUser).to.have.property('id');
    expect(newUser).to.have.status(201);

    UserID =  newUser.data.id;
  });
});

  describe('Message Service Integration Tests', () => {
    it('send a new message for a user', async () => {
      // Set up test data and dependencies
      const messageData = {
        user: UserID,
        message: 'Hello, Woebot!',
      };
  
      // Call the message service method to send a new message
      const sentMessage = await axios.post(`${baseURL}/message/new`, messageData);
  
      // Perform assertions
      expect(sentMessage.message).to.equal(messageData.message);
      expect(sentMessage).to.have.status(200);
    });
});