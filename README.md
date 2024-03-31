<!-- ABOUT THE PROJECT -->

## О проекте

<h3 align="justify">"Портал воспоминаний" - это интерактивная игра-головоломка, которая ставит игрока в роль программиста, проходящего собеседование на работу в крупную технологическую компанию. Игрок попадает в комнату с несколькими порталами, каждый из которых представляет собой воспоминание из прошлого программиста. В каждом воспоминании игрок должен решить ряд задач по программированию, начиная с простых и постепенно переходя к более сложным. После решения определенного количества задач игрок сталкивается с мини-боссом - более сложной задачей, которая должна быть решена за ограниченное время.
></h3>

### Особенности

<ul>
  <li>Уникальный и захватывающий игровой процесс, сочетающий решение головоломок и исследование повествования.</li> 
  <li>Разнообразные задачи по программированию, охватывающие широкий спектр тем и уровней сложности.</li> 
  <li>Опциональная система прохождения, позволяющая игрокам настраивать свой опыт.</li> 
  <li>Запоминающийся и атмосферный визуальный стиль, дополняющий повествование.</li> 
</ul>

### История обновлений

<ul>
  <li>v1.0 - initial commit</li> 
  <li>v1.01 - Добавлена базовая механика передвижения персонажа.</li> 
  <li>v1.02 - Добавлены анимации передвижения персонажа. Развернут бекэнд-сервис на отдельном сервере(папка backend). На нем реализован роут /runCode, который запускает пользовательский код через библиотеку VM2.</li> 
  <li>v1.03 - Роут /runCode переработан. Теперь запрос идет через /tasks/(номер задания). Реализованы тесты для первого задания. Создано временное модальное окно для проверки отправки кода.</li> 
</ul>

### Инструкция по запуску

<li>Приложение: 
cd client
npm run dev
Сервер: 
cd backend
npm run start</li>
