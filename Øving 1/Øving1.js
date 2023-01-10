class Bil {
  constructor(registreringsnr, merke, årsmodell, hastighet) {
    this.registreringsnr = registreringsnr;
    this.merke = merke;
    this.årsmodell = årsmodell;
    this.hastighet = hastighet;
  }
  gass() {
    this.hastighet += 10;
  }

  brems() {
    this.hastighet -= 10;
  }
}

let volvo = new Bil("3id9j29", "Volvo", 2016, 0);
let ferrari = new Bil("29dj82s", "Ferrari", 2009, 0);
let mercedes = new Bil("93ej934", "Mercedes", 2019, 0);

setInterval(() => {
  document.getElementById(
    "output"
  ).innerText = `Volvo kjører i ${volvo.hastighet} km/t
    Ferrari kjører i ${ferrari.hastighet} km/t
    Mercedes kjører i ${mercedes.hastighet} km/t`;
}, 10);

console.log(volvo);
console.log(ferrari);
console.log(mercedes);
