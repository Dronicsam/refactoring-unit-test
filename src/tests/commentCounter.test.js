import commentCounter from '../modules/commentCounter.js';

describe('commentCounter', () => {
  test('should return correct number of comments', async () => {
    // Мокаем fetch
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve([
        { comment: 'Nice!' },
        { comment: 'Tasty!' },
        { comment: 'Yum!' },
      ]),
    }));

    const count = await commentCounter('123');
    expect(count).toBe(3);
  });

  test('should return 0 if API returns undefined', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(undefined) }));

    const count = await commentCounter('456');
    expect(count).toBe(0);
  });
});
