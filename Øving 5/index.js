fetch("http://127.0.0.1:5500/%C3%98ving%205/fylkestopper.json")
  .then((res) => res.json())
  .then((data) => {
    let table = document.createElement("table"),
      row,
      cellA,
      cellB,
      cellC;
    document.getElementById("demo").appendChild(table);
    row = table.insertRow(0);
    cellA = row.insertCell();
    cellB = row.insertCell();
    cellC = row.insertCell();

    let b1 = document.createElement("b");
    let b2 = document.createElement("b");
    let b3 = document.createElement("b");

    b1.innerText = "Fylker";
    b2.innerText = "Navn på fjell";
    b3.innerText = "Høyde";

    cellA.appendChild(b1);
    cellB.appendChild(b2);
    cellC.appendChild(b3);

    data.sort((a, b) => {
      return b.høyde - a.høyde;
    });
    for (let i = 0; i < data.length; i++) {
      row = table.insertRow();
      cellA = row.insertCell();
      cellB = row.insertCell();
      cellC = row.insertCell();

      cellA.innerHTML = data[i].fylke;
      cellB.innerHTML = data[i].navn;
      cellC.innerHTML = data[i].høyde;
    }
  });
