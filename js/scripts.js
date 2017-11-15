/* 
Общий алгоритм:
Если задаем максимальное число точек, к которым нужно проводить линии (получаем из значения поля inputNumber):
1. Задаем переменную maxCount, равную количеству точек, к которым нужно проводить линии + 1 (точка, от которой проводим линии).
Проверяем длину массива х (у массива у будет такая же, поэтому ее отдельно не проверяем). Сохраняем ее в переменную arrLength.

2. Если arrLength == 0 {
  x[0] = evt.offsetX;
  y[0] = evt.offsetY;
  рисуем окружность в точке с координатами x[0], y[0].
}

3. Если 0 < arrLength < maxCount:
- рисуем окружность в точке x[arrLength], y[arrLength] (эти координаты добавляем в массив);
- для диапазона от i == 0 до i < arrLength проводим линии от точки с координатами x[arrLength], y[arrLength] до точек с координатами x[i], y[i].

4. Если arrLength == maxCount:
- перебираем координаты от i == 0 до i < (arrLength - 1) и присваиваем:
x[i] = x[i+1];
y[i] = y[i+1];
- присваиваем x[arrLength - 1] значение evt.offsetX, а y[arrLength - 1] - evt.offsetY;
- рисуем окружность в точке x[arrLength-1], y[arrLength-1] и проводим от нее линии к остальным точкам массива

*/

var canvas = document.querySelector('.canvas__canvas'),
    ctx = canvas.getContext('2d'),
    colors = document.getElementsByName('colors'),
    inputNumber = document.querySelector('.counter__input'),
    btnLess = document.querySelector('.counter__btn--less'),
    btnMore = document.querySelector('.counter__btn--more'),
    btnRestart = document.querySelector('.draw__btn--restart'),
    drawBlock = document.querySelector('.draw'),
    myColor = 'red';
    radius = 5,
    maxCount = 3,
    x = [],
    y = [],
    pi = Math.PI;


btnLess.onclick = function() {
  if (inputNumber.value > 2) {
    inputNumber.value--;
  }
}

btnMore.onclick = function() {
  inputNumber.value++;
}

btnRestart.onclick = function() {
  ctx.clearRect(0, 0, 300, 300);
  btnLess.disabled = false;
  btnMore.disabled = false;
  inputNumber.value = 2;
  maxCount = 3;
  x.length = 0;
  y.length = 0;
  colors[0].checked = true;
  myColor = 'red';
  this.disabled = true;
}


for (var i = 0; i < colors.length; i++) {
  colors[i].onchange = function() {
    if (this.checked) {
      myColor = this.value;
      return;
    }
  }
}

canvas.onclick = function(evt) {
  maxCount = parseInt(inputNumber.value, 10) + 1;
  if (btnRestart.disabled) {
    btnRestart.disabled = false;
  }
  
  if (!btnLess.disabled) {
    btnLess.disabled = true;
  }
  
  if (!btnMore.disabled) {
    btnMore.disabled = true;
  }
  
  var arrLength = x.length;
  if (arrLength == 0) {
    x[0] = evt.offsetX;
    y[0] = evt.offsetY;
    ctx.beginPath();
    ctx.arc(x[0], y[0], radius, 0, 2 * pi);
    ctx.fillStyle = myColor;
    ctx.fill();
  } else if (arrLength < maxCount) {
    x[arrLength] = evt.offsetX;
    y[arrLength] = evt.offsetY;
   
    ctx.beginPath();
    ctx.arc(x[arrLength], y[arrLength], radius, 0, 2* pi);
    ctx.fillStyle = myColor;
    ctx.fill();
    for (var i = 0; i < arrLength; i++) {
      ctx.beginPath();
      ctx.moveTo(x[arrLength], y[arrLength]);
      ctx.lineTo(x[i], y[i]);
      ctx.strokeStyle = myColor;
      ctx.closePath();
      ctx.stroke();
    }
  } else if (arrLength == maxCount) {


    for (var i = 0; i < arrLength - 1; i++) {
      x[i] = x[i+1];
      y[i] = y[i+1];
    }
    
      x[arrLength - 1] = evt.offsetX;
      y[arrLength - 1] = evt.offsetY;
      ctx.beginPath();
      ctx.arc(x[arrLength-1], y[arrLength-1], radius, 0, 2* pi);
      ctx.fillStyle = myColor;
      ctx.fill();
    for (var i = 0; i < arrLength; i++) {
      ctx.beginPath();
      ctx.moveTo(x[arrLength - 1], y[arrLength - 1]);
      ctx.lineTo(x[i], y[i]);
      ctx.strokeStyle = myColor;
      ctx.stroke();
    }

  }
}


