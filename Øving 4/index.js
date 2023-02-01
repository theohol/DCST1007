// Oppgave 1

function testTall(tall) {
  return new Promise((resolve, reject) => {
    if (isNaN(tall)) {
      reject(new Error("The input is not a number."));
    } else if (tall > 10) {
      resolve(`Tallet ${tall} er større enn 10`);
    } else if (tall < 10) {
      resolve(`Tallet ${tall} er mindre enn 10`);
    } else {
      resolve(`Tallet ${tall} er lik 10`);
    }
    resolve(tall);
  });
}

testTall(5)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

// Oppgave 2

function lagStoreBokstaver(ord) {
  return new Promise((resolve, reject) => {
    const storeOrd = ord.map((ord) => {
      if (typeof ord === "string") {
        return ord.toUpperCase();
      } else {
        reject(new Error("Arrayet inneholder elementer som ikke er strenger."));
      }
    });
    resolve(storeOrd);
  });
}

function sorterAlfabetisk(ord) {
  return new Promise((resolve, reject) => {
    if (ord.some((ord) => typeof ord !== "string")) {
      reject(new Error("Arrayet inneholder elementer som ikke er strenger."));
    } else {
      resolve(ord.sort());
    }
  });
}

lagStoreBokstaver(["eple", "banan", "pære"])
  .then((storeOrd) => sorterAlfabetisk(storeOrd))
  .then((sorterteOrd) => console.log(sorterteOrd))
  .catch((error) => console.error(error));

// Oppgave 3

fetch("https://api.github.com/users/remy")
  .then((response) => response.json())
  .then((data) => {
    const avatarURL = data.avatar_url;
    const avatarImg = document.createElement("img");
    avatarImg.src = avatarURL;
    document.body.appendChild(avatarImg);
  })
  .catch((error) => console.error(error));
