import FormValidation from '../modules/FormValidation.js';

describe('FormValidation', () => {
  let formValidation;

  beforeEach(() => {
    formValidation = new FormValidation(); // Создаем экземпляр перед каждым тестом
  });

  test('should validate correct name input', () => {
    expect(formValidation.validateName('John')).toBe(true);
    expect(formValidation.validateName("O'Connor")).toBe(true);
    expect(formValidation.validateName('Anne-Marie')).toBe(true);
  });

  test('should invalidate incorrect name input', () => {
    expect(formValidation.validateName('123')).toBe(false);
    expect(formValidation.validateName('John@')).toBe(false);
  });

  test('should validate correct date input', () => {
    expect(formValidation.validateDate('2024-04-11')).toBe(true);
  });

  test('should invalidate incorrect date input', () => {
    expect(formValidation.validateDate('11-04-2024')).toBe(false);
    expect(formValidation.validateDate('2024/04/11')).toBe(false);
    expect(formValidation.validateDate('')).toBe(false);
  });
});
