class Boble {
  constructor(x, y, r, farge) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.farge = farge;
    this.farge = generateColor();
  }
  flytt() {
    this.x = this.x + Math.floor(Math.random() * 10 - 5);
    this.y = this.y + Math.floor(Math.random() * 10 - 5);
  }
  vis() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = this.farge;
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.stroke();
  }
  inneholder(musx, musy) {
    let a = musx - this.x;
    let b = musy - this.y;
    let d = Math.sqrt(a * a + b * b);

    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  erBobleUtenforKanten() {}
}

function generateColor() {
  const hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += hexArray[Math.floor(Math.random() * 16)];
  }
  return `#${code}`;
}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", musklikk, false);
canvas.addEventListener("mousemove", musbeveg, false);

let bobler = [];

for (let i = 0; i < 10; i++) {
  let x = Math.floor(Math.random() * canvas.width);
  let y = Math.floor(Math.random() * canvas.height);
  let r = Math.floor(Math.random() * 40 + 10);
  bobler[i] = new Boble(x, y, r);
}

setInterval(tegn, 100);

function tegn() {
  reset();
  for (let i = 0; i < bobler.length; i++) {
    bobler[i].flytt();
    bobler[i].vis();
  }
}

function reset() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function musklikk(event) {
  let fikkvalgtenboble = false;

  for (let i = 0; i < bobler.length; i++) {
    if (bobler[i].inneholder(event.x, event.y)) {
      bobler.splice(i, 1);
      fikkvalgtenboble = true;
    }
  }

  if (fikkvalgtenboble == false) {
    let r = Math.floor(Math.random() * 40 + 10);
    let b = new Boble(event.x, event.y, r);
    bobler.push(b);
  }
}

function musbeveg(event) {
  for (let i = 0; i < bobler.length; i++) {
    if (bobler[i].inneholder(event.x, event.y)) {
      bobler[i].farge = "red";
    } else {
      bobler[i].farge = generateColor();
    }
  }
}

setInterval(() => {
  let r = Math.floor(Math.random() * 40 + 10);
  let b = new Boble(
    Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height),
    r
  );
  bobler.push(b);
}, 1000);
