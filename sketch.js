let points = [[-3, 5], [3, 7], [1, 5],[2,4],[4,3],[5,2],[6,2],[8,4],[8,-1],[6,0],[0,-3],[2,-6],[-2,-3],[-4,-2],[-5,-1],[-6,1],[-6,2]];
let fishes = [];
let song;
let amplitude;

function preload() {
  song = loadSound('midnight-quirk-255361.mp3'); // 請將 'path/to/your/music.mp3' 替換為音樂檔案的路徑
}

function setup() { //設定
  //一個充滿視窗的畫布
  createCanvas(windowWidth, windowHeight); //建立畫布，畫布的寬為視窗的寬，高為視窗的高

  //createCanvas(400, 400); //建立畫布，畫布的寬為400，高為400

  for (let i = 0; i < 10; i++) {
    fishes.push({
      x: random(width),
      y: random(height),
      dx: random(-2, 2),
      dy: random(-2, 2),
      size: random(20, 50)
    });
  }

  song.loop();
  amplitude = new p5.Amplitude();
}

function draw() { //畫布
  background("#ffe8d6"); //背景色為淺橘色
  //畫一個有顏色的圖，框線為白色，圓的顏色為黑色，框線粗細為5 
  let level = amplitude.getLevel();
  let sizeFactor = map(level, 0, 1, 1, 2);

  fill(0, 0, 0);
  stroke("#6c584c");
  strokeWeight(5);
  ellipse(200, 200, 100 * sizeFactor, 100 * sizeFactor); //畫一個圓，圓心為(200,200)，半徑為100

  //在上一個圓上左右各新增一個圓，要看起來像米老鼠的耳朵
  ellipse(150, 150, 50 * sizeFactor, 50 * sizeFactor);
  ellipse(250, 150, 50 * sizeFactor, 50 * sizeFactor);

  for (let i = 0; i < points.length - 1; i++) {
    let x1 = map(points[i][0], -10, 10, 0, width);
    let y1 = map(points[i][1], -10, 10, height, 0);
    let x2 = map(points[i + 1][0], -10, 10, 0, width);
    let y2 = map(points[i + 1][1], -10, 10, height, 0);
    line(x1, y1, x2, y2);
  }
  // 連接最後一個點和第一個點
  let x1 = map(points[points.length - 1][0], -10, 10, 0, width);
  let y1 = map(points[points.length - 1][1], -10, 10, height, 0);
  let x2 = map(points[0][0], -10, 10, 0, width);
  let y2 = map(points[0][1], -10, 10, height, 0);
  line(x1, y1, x2, y2);

  for (let fish of fishes) {
    fish.x += fish.dx;
    fish.y += fish.dy;

    if (fish.x < 0 || fish.x > width) fish.dx *= -1;
    if (fish.y < 0 || fish.y > height) fish.dy *= -1;

    drawFish(fish.x, fish.y, fish.size * sizeFactor);
  }
}

function drawFish(x, y, size) {
  fill(0, 0, 0);
  stroke("#6c584c");
  strokeWeight(2);
  ellipse(x, y, size * 2, size); // 魚的身體
  triangle(x - size, y, x - size * 1.5, y - size / 2, x - size * 1.5, y + size / 2); // 魚的尾
}
