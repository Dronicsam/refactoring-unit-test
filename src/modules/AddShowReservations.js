import { API_URLS } from '../utils/config.js';
import FormValidation from './FormValidation.js';
import { handleError } from '../utils/errorHandler.js';

class AddShowReservations {
  constructor() {
    this.link = API_URLS.reservations;
    this.validator = new FormValidation();
  }

  renderForm = () => `
    <form id='submit-reservation'>
      <h3>Add a reservation</h3>
      ${this.createInput('name', 'Your name')}
      ${this.createInput('res-popup-start-date', 'Start date')}
      ${this.createInput('res-popup-end-date', 'End date')}
      <button type='submit'>Reserve</button>
    </form>
    <h3 class='reservations-list-header'>
      Reservations <span id="reservations-counter"></span>
    </h3>
    <div id='reservations-list'></div>
  `;

  createInput = (name, placeholder) => `
      <div class="resPopupFormItem">
        <input type='text' required name="${name}" placeholder='${placeholder}'>
      </div>
    `;

  async fetchReservations(id) {
    try {
      const response = await fetch(`${this.link}?item_id=${id}`);
      if (!response.ok) throw new Error(response.statusText);
      return await response.json();
    } catch (e) {
      handleError(e);
      return [];
    }
  }

  async renderReservations(id) {
    const data = await this.fetchReservations(id);
    const list = document.getElementById('reservations-list');
    list.innerHTML = data
      .reverse()
      .map(
        (el) => `
        <div class="reservation-list-item">
          <strong>${el.date_start}</strong> - <strong>${el.date_end}</strong> by <strong>${el.username}</strong>
        </div>
      `,
      )
      .join('');
    this.updateReservationsCounter(data.length);
  }

  updateReservationsCounter = (count) => {
    const counter = document.getElementById('reservations-counter');
    counter.textContent = `(${count})`;
  };

  async submitForm(data, formElement, id) {
    const name = data.get('name');
    const start = data.get('res-popup-start-date');
    const end = data.get('res-popup-end-date');

    if (
      !this.validator.validateName(name)
      || !this.validator.validateDate(start)
      || !this.validator.validateDate(end)
    ) {
      this.showFormError(formElement, 'Invalid values');
      return false;
    }

    this.clearFormError();
    await this.sendData({
      id,
      name,
      start,
      end,
    });
    return true;
  }

  showFormError = (form, message) => {
    if (!document.getElementById('reservationFormErr')) {
      form.insertAdjacentHTML(
        'afterend',
        `<div id="reservationFormErr">${message}</div>`,
      );
    }
  };

  clearFormError = () => {
    const formErr = document.getElementById('reservationFormErr');
    if (formErr) formErr.remove();
  };

  sendData = async ({
    id, name, start, end,
  }) => {
    const dataJson = {
      item_id: id,
      username: name,
      date_start: start,
      date_end: end,
    };

    try {
      const response = await fetch(this.link, {
        method: 'POST',
        body: JSON.stringify(dataJson),
        headers: { 'Content-Type': 'application/json' },
      });

      const HTTP_STATUS_CREATED = 201;

      if (response.status === HTTP_STATUS_CREATED) {
        this.renderReservations(id);
      }
    } catch (e) {
      handleError(e);
    }
  };
}

export default AddShowReservations;
