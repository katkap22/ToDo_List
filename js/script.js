'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const list = document.querySelector('ul'),
          btnAddTask = document.querySelector('button.addTask__button'), //Получаем кнопку для добавления нового 
                                                                          //задания (можно получить форму и тогда 
                                                                          //событие будет  не click, а submit)       
          inputTask = document.querySelector('.addTask__input'), //Получаем форму ввода для нового задания
          checkbox = document.querySelectorAll('[type="checkbox"]');
    
          let todos; //Переменная, которая хранит текущий список задач

    function toLocal(){
        todos = list.innerHTML;// Получаем список задач в виде строки
        localStorage.setItem('todos', todos);// Сохраняем пару ключ/значение в локальном хранилище
    }

    function fromLocal(){
        if(localStorage.getItem('todos')){
          list.innerHTML = localStorage.getItem('todos');
      } 
    }

    function addTask() {
        let newTask = inputTask.value; //Присваиваем переменной newTask значение введенное в строку ввода
        if(newTask){   
            list.insertAdjacentHTML(
                "beforeend",
                `<li>
                   <input type="checkbox" class="input-li"> <span class = "task">${newTask}</span>
                   <button class="delete-btn">X</button>
                </li>`
            );
            inputTask.value = '';
        } else {
            alert("Add a new task!");
          }   
    }

    fromLocal();

    btnAddTask.addEventListener('click', event => {   //При клике на кнопку добавления задания
       event.preventDefault();
       addTask();
       toLocal();
    });  
    
    
    list.addEventListener('click',  event => {     //При клике на область списка задач 
        if (event.target.className ==='input-li') {

            if (event.target.hasAttribute('checked')) {
                event.target.removeAttribute('checked');
            } else {
                event.target.setAttribute('checked', true);
            }

        toLocal();
        } else 

        if (event.target.className === 'delete-btn') {
            event.target.parentNode.remove();
            toLocal();
        }
    }, false);
    
});