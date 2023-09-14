const axios = require('axios');
const { baseURL } = require('../test.config.js'); // Importing the base URL
const { expect } = require('chai');
const chai = require("chai");
const expect = require("chai").expect;


// Generate a random email address
const randomEmail = faker.internet.email();

// Generate random password
var generator = require('generate-password');
var password = generator.generate({
	length: 10,
	numbers: true
});

describe
('User Service Integration Tests', () => {
  let UserID1; // Variable to store the user ID
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

    UserID1 =  newUser.data.id;
  });
  
});