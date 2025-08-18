const addIcon = document.querySelector('.add-icon');
function addTask() {
  let taskValue = document.getElementById('input');
  let task = `<div class="task-container">
         <input type="radio" name="" id="check" />
         <p class="task">${taskValue.value}</p>
      <img src="images/icon-cross.svg" alt="" class="cross" /></div>`;
  if (taskValue.value.trim() === '') {
    alert('Please enter a task');
    return;
  }
  let taskArray = [];
  taskArray.push(task);
  taskArray.forEach(item => {
    let card = document.querySelector('.card');
    card.innerHTML += item;
  });
  taskValue.value = '';

  let crossIcons = document.querySelectorAll('.cross');
  crossIcons.forEach(cross => {
    cross.addEventListener('click', function () {
      let taskContainer = cross.parentElement;
      taskContainer.remove();
    });
  });

  let checkIcons = document.querySelectorAll('#check');
  checkIcons.forEach(check => {
    const handleCheckClick = (el) => {
      const isImg = el.tagName && el.tagName.toLowerCase() === 'img';
      const taskText = el.nextElementSibling; // both radio and checkImg sit before the <p>

      if (isImg) {
        // uncheck: replace image with a radio input
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.id = 'check';
        radio.name = '';
        radio.addEventListener('click', () => handleCheckClick(radio));
        el.parentNode.replaceChild(radio, el);

        taskText.style.textDecoration = 'none';
        taskText.style.color = 'var(--task-color)';
      } else {
        // radio clicked
        if (el.checked) {
          const checkImg = document.createElement('img');
          checkImg.src = 'images/icon-check.svg';
          checkImg.className = 'check';
          checkImg.addEventListener('click', () => handleCheckClick(checkImg));
          el.parentNode.replaceChild(checkImg, el);

          taskText.style.textDecoration = 'line-through';
          taskText.style.color = 'var(--Purple-600)';
        } else {
          taskText.style.textDecoration = 'none';
          taskText.style.color = 'var(--task-color)';
        }
      }
    };

    check.addEventListener('click', function () {
      handleCheckClick(check);
    });
  });
  taskValue.focus(); // Focus back on the input field after adding a task

}

addIcon.addEventListener('click', addTask);
document.getElementById('input').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

let themeIconSun = document.querySelector('.sun');
let themeIconMoon = document.querySelector('.moon');

themeIconSun.addEventListener('click', themeToggle);
themeIconMoon.addEventListener('click', themeToggle);

function themeToggle() {
  document.body.classList.toggle('dark-theme');
  themeIconSun.classList.toggle('sunh');
  themeIconMoon.classList.toggle('moonh');
}