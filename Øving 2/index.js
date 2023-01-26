let btn = document.getElementById("btn");

class Konto {
  constructor(kundeNum, kundeNavn, saldo) {
    this.kundeNum = kundeNum;
    this.kundeNavn = kundeNavn;
    this.saldo = saldo;
  }

  innskudd(deposit) {
    const message = document.getElementById("p01");
    try {
      if (deposit == "") throw "empty";
      if (isNaN(deposit)) throw "not a number";
      deposit = Number(deposit);
      if (deposit < 0) throw "too low";
      this.saldo += deposit;
    } catch (err) {
      message.innerText = "Input is " + err;
    }
  }

  uttak(withdraw) {
    const message = document.getElementById("p01");
    try {
      if (withdraw == "") throw "empty";
      if (isNaN(withdraw)) throw "not a number";
      withdraw = Number(withdraw);
      if (withdraw > this.saldo) throw "too high";
      if (withdraw < 0) throw "too low";
      this.saldo -= withdraw;
    } catch (err) {
      message.innerText = "Input is " + err;
    }
  }

  kontoInformasjon() {
    return console.log(
      `${this.kundeNavn} med kundenummer ${this.kundeNum} har ${this.saldo} kroner på konto.`
    );
  }
}

class BarneKonto extends Konto {
  constructor(kundeNum, kundeNavn, saldo = 200) {
    super(kundeNum, kundeNavn, saldo);
  }
}

const Lise = new BarneKonto(1, "Lise Jensen");
const Kari = new Konto(2, "Kari hansen", 895);
const Petter = new Konto(3, "Petter Olsen", 0);

const arr = [
  "10:30: Kari tar ut 300 kroner.",
  "11:00: Bestefaren til Lise er i det gavmilde hjørnet, og setter inn 4000 kroner.",
  "11:00 Petter setter inn 3000 kr.",
  "12:15: Kari overfører 250 kroner i bursdagsgave til Petter.",
  "17:30: Kari tar ut 800 kroner???",
];

const func = [
  function () {
    Kari.uttak(300);
  },
  function () {
    Lise.innskudd(4000);
  },
  function () {
    Petter.innskudd(3000);
  },
  function () {
    Petter.innskudd(250);
  },
  function () {
    Kari.uttak(800);
  },
];

let i = 0;

btn.onclick = () => {
  let timer = setInterval(() => {
    if (arr.length) {
      document.getElementById("output").innerText += arr.shift() + "\n";
    } else {
      clearInterval(timer);
    }

    func[i]();
    i++;
    if (i === func.length) {
      clearInterval(timer);
    }

    Lise.kontoInformasjon();
    Kari.kontoInformasjon();
    Petter.kontoInformasjon();
  }, 5000);
};
