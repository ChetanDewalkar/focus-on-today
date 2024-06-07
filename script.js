const allCheckBoxes = document.querySelectorAll('.checkbox');
const allInputFields = document.querySelectorAll('.input');
const errMessage = document.querySelector('.errMessage');
const progressValue = document.querySelector('.progressValue');
const slogan = document.querySelector('.slogan');
const sloganObject = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill...',
];

//getting local storage data

const userData = JSON.parse(localStorage.getItem('userData')) || {
  first: { name: '', completed: false },
  second: { name: '', completed: false },
  third: { name: '', completed: false },
};

// progress value reload code

const totalCompleted = Object.values(userData).filter((eachObject) => {
  return eachObject.completed;
});
const totalCompletedLength = totalCompleted.length;
progressValue.style.width = `${(totalCompletedLength / 3) * 100}%`;

// progressValue text reload code

progressValue.firstElementChild.innerText = `${totalCompletedLength}/3 completed`;

//slogan reload code

slogan.innerText = sloganObject[totalCompletedLength];

// code start........
// code for checkbox

allCheckBoxes.forEach((eachCheckbox) => {
  eachCheckbox.addEventListener('click', (e) => {
    const everyElementFillStatus = [...allInputFields].every(
      (eachInputField) => {
        return eachInputField.value;
      }
    );

    if (everyElementFillStatus) {
      eachCheckbox.parentElement.classList.toggle('completed');

      //updating the completed status of local storage

      const inputId = eachCheckbox.nextElementSibling.id;
      userData[inputId].completed = !userData[inputId].completed;

      localStorage.setItem('userData', JSON.stringify(userData));

      //progress value code

      const totalCompleted = Object.values(userData).filter((eachObject) => {
        return eachObject.completed;
      });
      const totalCompletedLength = totalCompleted.length;

      progressValue.style.width = `${(totalCompletedLength / 3) * 100}%`;

      slogan.innerText = sloganObject[totalCompletedLength];

      //progress value inner text code

      progressValue.firstElementChild.innerText = `${totalCompletedLength}/3 completed`;
    } else {
      errMessage.parentElement.classList.add('showErr');
    }
  });
});

//code for input field

[...allInputFields].forEach((eachInputField) => {
  eachInputField.value = userData[eachInputField.id].name;

  if (userData[eachInputField.id].completed) {
    eachInputField.parentElement.classList.add('completed');
  }

  // focus event listener

  eachInputField.addEventListener('focus', (e) => {
    errMessage.parentElement.classList.remove('showErr');
  });

  //input event listener

  eachInputField.addEventListener('input', (e) => {
    if (userData[eachInputField.id].completed) {
      eachInputField.value = userData[eachInputField.id].name;
      return;
    }

    //update setting the local storage

    userData[eachInputField.id] = {
      name: eachInputField.value,
      completed: false,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  });
});
