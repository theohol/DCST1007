fetch("http://127.0.0.1:5500/%C3%98ving%205/fylkestopper.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data[0].Viken);
    let table = document.createElement("table"),
      row,
      cellA,
      cellB;
    document.getElementById("demo").appendChild(table);
    const fylker = ["Viken", "Innlandet"];
    for (let i = 0; i < data.length; i++) {
      row = table.insertRow();
      cellA = row.insertCell();
      cellB = row.insertCell();
      cellC = row.insertCell();

      cellA.innerHTML = i;
      cellB.innerHTML = data[i].fylker[0].navn;
      cellC.innerHTML = data[i].Viken.høyde;
    }
  });
