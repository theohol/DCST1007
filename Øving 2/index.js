class Konto {
  constructor(kundeNum, kundeNavn, saldo) {
    this.kundeNum = kundeNum;
    this.kundeNavn = kundeNavn;
    this.saldo = saldo;
  }

  innskudd(deposit) {
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
