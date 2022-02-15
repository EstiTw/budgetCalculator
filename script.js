'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  username: 'js',
  category: [
    'Food',
    'Ride',
    'Toilet',
    'Cleaning',
    'Sport',
    'Resturants',
    'Bills',
  ],
  budgets: [2000, 2050, 4000, 0, 0, 0, 0],
  expenses: [-200, -450, -400, -3000, -650, -130, -70, -1300],
  categories: [
    'food',
    'food',
    'ride',
    'cleaning',
    'ride',
    'food',
    'food',
    'ride',
  ],
  dates: [
    '2021-01-25T12:44:07.747Z',
    '2021-01-25T12:44:08.747Z',
    '2021-02-25T12:44:07.747Z',
    '2021-03-25T12:44:07.747Z',
    '2021-04-25T12:44:07.747Z',
    '2021-05-25T13:44:07.747Z',
    '2022-01-25T12:44:07.747Z',
    '2022-01-25T12:44:07.747Z',
    '2022-01-25T12:44:07.747Z',
  ],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  username: 'jd',
  expenses: [5000, 3400, -150, -790, -3210, -1000, -8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  username: 'stw',
  expenses: [-200, -200, 340, -300, -20, -50, -400, -460],
  category: ['Ride', 'Toilet', 'Cleaning', 'Sport', 'Resturants', 'Bills'],
  budgets: [1000, 2050, 4000, 1000, 350, 0],
  categories: [
    'ride',
    'ride',
    'cleaning',
    'cleaning',
    'ride',
    'resturants',
    'ride',
    'toilet',
  ],
  dates: [
    '2021-01-25T12:44:08.747Z',
    '2021-02-25T12:44:07.747Z',
    '2021-03-25T12:44:07.747Z',
    '2021-04-25T12:44:07.747Z',
    '2021-05-25T13:44:07.747Z',
    '2022-01-25T12:44:07.747Z',
    '2022-01-25T12:44:07.747Z',
    '2022-01-25T12:44:07.747Z',
  ],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  username: 'ss',
  expenses: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelTotal = document.querySelector('.total__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerExpenses = document.querySelector('.expenses');
const containerCategories = document.querySelector('.conclusion');

const btnLogin = document.querySelector('.login__btn');
const btnExpense = document.querySelector('.form__btn--expense');
const btnCategory = document.querySelector('.form__btn--category');
const btnRange = document.querySelector('.form__btn--range');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputExpense = document.querySelector('.form__input--expense');
const inputExpenseAmount = document.querySelector('.form__input--amount');
const inputCategoryName = document.querySelector('.form__input--category-name');
const inputCategoryBudget = document.querySelector(
  '.form__input--category-budget'
);
const inputFromDate = document.querySelector('.form__input--from');
const inputToDate = document.querySelector('.form__input--to');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const selectCategory = document.getElementById('categories');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

// Helper functions

//TODO: default parameters dates
const updateUI = function (currAcc, first, last) {
  last = last ? last : new Date();
  let temp = new Date(last);
  first = first ? first : new Date(temp.setMonth(last.getMonth() - 1));

  displayExpenses(currAcc, first, last);
  displayTotal(currAcc, first, last);
  showByCategories(currAcc, first, last);
};

const formatedCategory = function (category) {
  const c = category
    .split('_')
    .map(c => c.replace(c[0], c[0].toUpperCase()))
    .join(' ');

  return c;
};

const toClassCategory = function (category) {
  return category.toLowerCase().replaceAll(' ', '_');
};

const stringToDate = function (date) {
  const d = date.split('-');
  return new Date(d[0], +d[1] - 1, +d[2]);
};

const dateToString = function (date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day.toString().padStart(2, '0')}/${month
    .toString()
    .padStart(2, '0')}/${year}, ${hours}:${minutes}`;
};

const addCss = function (cssCode) {
  var style = document.createElement('style');
  style.innerHTML = cssCode;
  document.head.appendChild(style);
};

const generateColor = function () {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

////////////////////////////////////////////
// Functions

//TODO: add x day ago format
const displayExpenses = function (acc, first, last) {
  containerExpenses.innerHTML = '';

  // Add to the Sammary
  acc.expenses.forEach((exp, i) => {
    const currDate = new Date(acc.dates[i]);

    //add expense if exp is in range
    if (
      currDate.getTime() >= first.getTime() &&
      currDate.getTime() <= last.getTime()
    ) {
      const classCategory = acc.categories[i];
      let date = dateToString(new Date(acc.dates[i]));

      const html = `<div class="expenses__row">
      <div class="expenses__category expenses__category--${classCategory}"> ${formatedCategory(
        classCategory
      )}</div>
    <div class="expenses__date">${date}</div>
    <div class="expenses__value">${exp}€</div>
  </div>`;

      containerExpenses.insertAdjacentHTML('afterbegin', html);
    }
  });
};

//TODO: Combine reduce with filter
const displayTotal = function (acc, first, last) {
  // Sum expenses wich in the dates range
  labelTotal.textContent = acc.expenses
    .filter((exp, i) => {
      const currDate = new Date(acc.dates[i]);
      return currDate > first && currDate < last;
    })
    .reduce((sum, exp) => sum + exp, 0);
};

const showByCategories = function (acc, first, last) {
  // Clear category conclusion section
  containerCategories.innerHTML = '';

  // Sum expenses wich in the dates range && same category
  acc.category.forEach((c, i) => {
    const classCategory = toClassCategory(c);
    const categorySum = acc.expenses
      .filter((exp, j) => {
        const currDate = new Date(acc.dates[j]);
        return (
          currDate >= first &&
          currDate <= last &&
          acc.categories[j] === classCategory
        );
      })
      .reduce((sum, exp) => sum + exp, 0);

    // Date for HTML and CSS
    const categoryBudget = acc.budgets[i];
    const categoryOut = categorySum ? categorySum : 0;
    const categoryRemain = categoryBudget + categoryOut;
    let percentRemain =
      categoryBudget == 0 ? 0 : (categoryRemain / categoryBudget) * 100;

    // Create HTML & CSS
    const html = `
    <div
        class="expenses__category expenses__category--${classCategory} category__row"
      >
      ${c}
      </div>
    <div class="lineContainer  ${classCategory}Line">
          <div class="left"></div>
          <div class="right"></div>
        </div>
    <div class="category__row expenses__row">
      
      <div class="expenses__value category__budget">${categoryBudget}</div>
      <div class="expenses__value category__out">${categoryOut}</div>
      <div class="expenses__value category__remain">${categoryRemain}</div>
    </div>
    `;

    percentRemain = percentRemain <= 0 ? 0 : percentRemain;

    // Add css and HTML
    const css = `.${classCategory}Line .left{
      width: ${percentRemain}% !important;
        }`;
    addCss(css);
    containerCategories.insertAdjacentHTML('afterbegin', html);
  });
};

///////////////////////////////////////////////
// Event Handleres

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  const user = inputLoginUsername.value;
  const pass = inputLoginPin.value;
  const accountIndex = accounts.findIndex(
    acc => acc.username == user && acc.pin == pass
  );

  // Update UI if login details is currect
  if (accountIndex > -1) {
    currAcc = accounts[accountIndex];
    labelDate.innerHTML = dateToString(new Date());
    labelWelcome.innerHTML = `Welcome back ${currAcc.owner}!`;
    //TODO: opacity
    updateUI(currAcc);
  }
  // Clear inputs
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
});

//TODO: adding detailes as option
btnExpense.addEventListener('click', function (e) {
  //// Prevent form from submitting
  e.preventDefault();

  const category = selectCategory.value;
  const amount = Math.abs(+inputExpenseAmount.value);

  // Adding the expense
  if (category !== 'empty' && amount !== 0) {
    const date = new Date().toISOString();

    currAcc.expenses.push(-amount);
    currAcc.categories.push(toClassCategory(category));
    currAcc.dates.push(date);
  }

  // Clear input fields
  selectCategory.value = 'empty';
  inputExpenseAmount.value = '';
  inputExpenseAmount.blur();

  // Update UI
  updateUI(currAcc);
});

btnCategory.addEventListener('click', function (e) {
  //// Prevent form from submitting
  e.preventDefault();

  const classCategory = toClassCategory(inputCategoryName.value);
  const formatCategory = formatedCategory(classCategory);

  //TODO: What if we whant 0 budget
  if (
    !currAcc.category.includes(formatedCategory) &&
    inputCategoryName.value !== '' &&
    +inputCategoryBudget.value > 0
  ) {
    //Add option to selectCategory
    const option = document.createElement('option');
    option.text = formatCategory;
    option.value = classCategory;
    selectCategory.add(option);

    // Add option and budget to account
    currAcc.category.push(option.text);
    currAcc.budgets.push(+inputCategoryBudget.value);

    //Add CSS
    const randomColor1 = generateColor();
    const randomColor2 = generateColor();
    const css = `.expenses__category--${option.value} {
    background-image: linear-gradient(to top left, ${randomColor1}, ${randomColor2});
  }`;
    addCss(css);

    // Update UI
    updateUI(currAcc);
  }

  // Clear input fields
  inputCategoryName.value = inputCategoryBudget.value = '';
  inputCategoryName.blur();
  inputCategoryBudget.blur();
});

btnRange.addEventListener('click', function (e) {
  //// Prevent form from submitting
  e.preventDefault();

  // Convert to Date format
  const first = stringToDate(inputFromDate.value);
  const last = stringToDate(inputToDate.value);

  // Validate the range and ERROR to the user
  if (!(first.getTime() <= last.getTime)) {
    //console.log('The RANGE DONT make SENSE');
    window.alert('The range is NOT valid');
  }

  // Update UI by range
  updateUI(currAcc, first, last);

  // Clear input fields
  inputFromDate.value = inputToDate.value = '';
  inputFromDate.blur();
  inputToDate.blur();
});

/////////////////////////////////////////////
// Default parameters and variables
let currAcc = account1;

///////////////////////////////////////////
// // // Function Tests
// displayExpenses(currAcc);
// displayTotal(currAcc);
// showByCategories(currAcc);
updateUI(currAcc);

/*
TODO:
0. GIT GIT GIT GITTTTTT
1. Login event
2. Category budget - what if its set as zero
3. Date ragne validation DONE  
4. Categories by sum - UI
5. Sort by Category/amount
6. Summary down: monthly budget, out, restBudget
7. Rounding (x.xx) + Shekel sign
8. Cheking selected value and value
9. Editing Category Budget. e.g budget is per month
10. Keep conclusion of month for diagram and statistics. working with DB
11. Login and keep the information in DB
12. Sharing budget
13. Close account
14. check if inputs are number. Note: NaN type is "number" :D
*/
