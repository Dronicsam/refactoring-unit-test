import itemsCounter from '../modules/itemsCounter.js';

describe('itemsCounter', () => {
  test('should update link innerHTML with counter value and return counter', () => {
    // Setup the DOM
    document.body.innerHTML = `
      <span id="counter"></span>
    `;

    const counterElement = document.getElementById('counter');
    const countValue = 3;

    // Call the function
    const result = itemsCounter(countValue, counterElement);

    // Assertions
    expect(result).toBe(3); // Function returns the counter value
    expect(counterElement.innerHTML).toBe('Home(3)'); // innerHTML is set to Home(3)
  });

  test('should handle zero counter and update link innerHTML', () => {
    // Setup the DOM
    document.body.innerHTML = `
      <span id="counter"></span>
    `;

    const counterElement = document.getElementById('counter');
    const countValue = 0;

    // Call the function
    const result = itemsCounter(countValue, counterElement);

    // Assertions
    expect(result).toBe(0); // Function returns the counter value
    expect(counterElement.innerHTML).toBe('Home(0)'); // innerHTML is set to Home(0)
  });
});
