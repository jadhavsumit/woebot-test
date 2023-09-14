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

    // Assertions
    expect(newUser).to.have.property('id');
    expect(newUser.email).to.equal(userData.email);
    expect(newUser).to.have.status(201);

    // Message service integration test
    describe('/message/new Endpoint', () => {
        it('should send a new message for a user', async () => {
          // Message payload    
          const messagePayload = {
            user: userData.email,
            message: 'Hello, Woebot!',
          };
      
          try {
            // Send a POST request to send a new message
            const response = await chai.request(baseURL).post('/message/new').send(messagePayload);
      
            // Verify the response status code (e.g., 200 for success)
            expect(response).to.have.status(200);
      
          } catch (error) {
            throw error;
          }
  });

});