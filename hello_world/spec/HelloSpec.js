const request = require('request');
const httpMocks = require('node-mocks-http');

const yyz_hello = require('../libs/yyz-hello');

describe('get custom greeting based on local day and time', () => {
  yyz_hello.greetingResponse();
  let date = yyz_hello.greetingResponse().date;
  let hour = yyz_hello.greetingResponse().hour;

  it('has an date', () => {
    expect(date).toBeDefined();
  });

  it('has an hour', () => {
    expect(hour).toBe(date.getHours());
  });

  it('has a greeting', () => {
    let greeting = '';
    if (hour > 3 && hour < 12) {
      greeting = 'Good Morning'
    } else if (hour >= 12 && hour < 20) {
      greeting = 'Good Afternoon'
    } else if (hour >= 20 || hour <= 3) {
      greeting = 'Good Evening'
    }
    const customGreeting = yyz_hello.greetingResponse().greeting;
    expect(customGreeting).toBe(greeting);
  });

  it('has a day', () => {
    const day = yyz_hello.greetingResponse().dayOfWeek;
    const todaysDate = date.toLocaleString('en-us', {  weekday: 'long' });
    expect(day).toBe(todaysDate);
  });

});

describe('helper functions', () => {
  let day = 'monday'

  let capitalizedString = yyz_hello.capitalizeFirstLetter(day);

  it('passes a random weekday string as the argument', () => {
    expect(day).toBeDefined();
  });

  it('can capitalize the first letter', () => {
    expect(day.charAt(0).toUpperCase()).toBe('M');
  });

  it('can slice the string by the first index', () => {
    expect(day.slice(1)).toBe('onday');
  });

  it('can return a string with the first letter capitalized', () => {
    expect(capitalizedString).toBe('Monday');
  });
});

/*
let req = mocks.createRequest();
let res = mocks.createResponse();

describe('getGreeting module', () => {
  yyz_hello.getGreeting(req,res);

}
*/

/*  Integration Tests
it("should respond with a greeting based on local time and day", function(done) {
  request("http://localhost:5000/api/hello?json", function(error, response, body){
    expect(body).toEqual(JSON.stringify(helloResponse));
    done();
  });
});

it("should respond with a greeting based on local time and given day of week", function(done) {
  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  for (var day of days) {
    request("http://localhost:5000/api/hello/"+day+"?json", function(error, response, body){
      helloResponse = {'greeting': greeting, 'dayOfWeek': capitalizeFirstLetter(day)};
      expect(body).toEqual(JSON.stringify(helloResponse));
      done();
    });
  }
}); 

*/

