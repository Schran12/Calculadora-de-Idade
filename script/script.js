const form = document.getElementById('age-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    calculateAge();
  });

  function calculateAge() {
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const inputs = [dayInput, monthInput, yearInput];

    const values = {
      day: parseInt(dayInput.value),
      month: parseInt(monthInput.value),
      year: parseInt(yearInput.value),
    };

    const today = new Date();
    const birthDate = new Date(values.year, values.month - 1, values.day);
    let isValid = true;

    // Limpa erros anteriores
    inputs.forEach((input) => {
      const group = input.parentElement;
      group.classList.remove('error');
      input.classList.remove('error');
      group.querySelector('label').classList.remove('error');
      group.querySelector('.error-message').textContent = '';
    });

    // Validação dos campos
    if (isNaN(values.day) || values.day < 1 || values.day > 31) {
      setError(dayInput, 'Dia inválido');
      isValid = false;
    }

    if (isNaN(values.month) || values.month < 1 || values.month > 12) {
      setError(monthInput, 'Mês inválido');
      isValid = false;
    }

    if (isNaN(values.year) || values.year > today.getFullYear()) {
      setError(yearInput, 'Ano inválido');
      isValid = false;
    }

    // Validação de data completa
    if (isValid && (birthDate > today || birthDate.getDate() !== values.day)) {
      setError(dayInput, 'Data inválida');
      isValid = false;
    }

    if (!isValid) {
      displayResults('--', '--', '--');
      return;
    }

    // Cálculo da idade
    let years = today.getFullYear() - values.year;
    let months = today.getMonth() - (values.month - 1);
    let days = today.getDate() - values.day;

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += prevMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    displayResults(years, months, days);
  }

  function setError(input, message) {
    const group = input.parentElement;
    group.classList.add('error');
    input.classList.add('error');
    group.querySelector('label').classList.add('error');
    group.querySelector('.error-message').textContent = message;
  }

  function displayResults(years, months, days) {
    document.getElementById('results').innerHTML = `
      <span>${years}</span> years<br />
      <span>${months}</span> months<br />
      <span>${days}</span> days
    `;
  }