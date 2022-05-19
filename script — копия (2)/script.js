/* Выбираем все элементы .food-card с помощью document.querySelectorAll(). */
const cards = document.querySelectorAll('.food-card');

let hasFlippedCard = false; 
let lockBoard = false;
let firstCard, secondCard;


/* Переворачивание карточек. 
 
При каждом нажатии на карточку будет вызываться функция flipCard(). 
Функция получает доступ к списку классов элемента и активирует класс flip.
this отвечает за нажатую карточку. 

После нажатия на первую карточку она ожидает переворота другой. 
Переменные hasFlippedCard и flippedCard отвечают за состояние переворота. 

Если ни одна карточка не перевёрнута, значение hasFlippedCard устанавливается равным true, а нажатой карточке присваивается flippedCard.

Теперь при нажатии на вторую карточку попадаем в else-блок условия.
В нем идет проверка совпадения карточек через метод checkForMatch.

Когда нажимаем на вторую карточку, переменной lockBoard будет присвоено значение true, а условие if (lockBoard) return 
предотвратит переворот других карточек до того, как эти две будут спрятаны или совпадут.
*/
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}




/* Событие, которое произойдет при клике мышки: переворт карточки с помощью функции flip.*/
cards.forEach(card => card.addEventListener('click', flipCard));



/* Метод checkForMatch проверяет, совпадают ли карточки.
В случае совпадаения будет вызван метод disableCards => 2 карточки зафиксируются и не будут проверяться обработчиком событий.
В случае несовпадения метод unflipCards() перевернёт обе карточки на исходную позицию.

Проверка идет по названиям карточек, которые устанавливаются в атрибуте data-frame в файле index.html.
*/
function checkForMatch() {
  let isMatch = firstCard.dataset.frame === secondCard.dataset.frame;
  
  isMatch ? disableCards() : unflipCards();
}



/* Функция, фиксирующая карточки на поле.*/
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}


/* Функция, возращающая карточки на исходную позицию спустя 1,5 секунды.*/
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}


/* Метод, который обнуляет каждый раунд переменные firstCard и secondCard (1 раунд = переворачивание 2 карточек). 
Вызывается из  disableCards() и unflipCards().*/
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


/* Перемешивание карточек.
В игре есть 16 карточек, поэтому пройдёмся по ним в цикле, сгенерируем случайное число 
и присвоим его свойству order (определяется свойством контейнера display: flex, 
отвечает за порядок карточек, по умолчанию у каждой карточки оно имеет значение 0, 
и элементы сначала упорядочиваются по возрастанию порядка карточки).
Например, пусть будут сгенерированы числа в диапазоне от 0 до 16. 
*/

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

 


