/**
 * @jest-environment jsdom
 */
import displayCards from '../modules/itemslist.js';
import * as likesModule from '../modules/likes.js';
import * as reservationsModule from '../modules/reservations.js';
import * as commentModule from '../modules/commentPopup.js';
import * as counterModule from '../modules/counter';

describe('displayCards', () => {
  let fetchSpy;

  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <div class="recipe-cards"></div>
      <span class="item-count"></span>
    `;

    // Mock global fetch
    fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: Array.from({ length: 20 }, (_, i) => ({
          idMeal: `${i + 1}`,
          strMeal: `Meal ${i + 1}`,
          strMealThumb: `thumb${i + 1}.jpg`,
        })),
      }),
    });

    // Mock dependencies
    jest.spyOn(likesModule, 'getLikes').mockImplementation(() => {});
    jest.spyOn(likesModule, 'likeInteraction').mockImplementation(() => {});
    jest.spyOn(counterModule, 'itemsCounter').mockImplementation(() => {});
    jest.spyOn(commentModule, 'doet').mockImplementation(() => {});
    jest.spyOn(commentModule, 'commentCounter').mockImplementation(() => {});
    jest.spyOn(reservationsModule, 'default').mockImplementation(() => ({
      init: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch meals and render up to 12 cards', async () => {
    await displayCards();

    const cards = document.querySelectorAll('.card');
    expect(cards.length).toBe(12);

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian',
    );
  });

  test('should call getLikes, likeInteraction, itemsCounter and Reservations.init', async () => {
    await displayCards();

    expect(likesModule.getLikes).toHaveBeenCalled();
    expect(likesModule.likeInteraction).toHaveBeenCalled();
    expect(counterModule.itemsCounter).toHaveBeenCalled();

    const Reservations = reservationsModule.default;
    const instance = Reservations.mock.results[0].value;
    expect(instance.init).toHaveBeenCalled();
  });

  test('should call comment and commentCounter when comment button clicked', async () => {
    await displayCards();

    const commentBtn = document.querySelector('.comment-btn');
    commentBtn.click();

    // Wait for event loop
    await Promise.resolve();

    expect(commentModule.doet).toHaveBeenCalledWith(commentBtn.id);
    expect(commentModule.commentCounter).toHaveBeenCalledWith(commentBtn.id);
  });
});
