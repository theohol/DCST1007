class Kjoretoy {
  constructor(makshastighet, kjorelengde) {
    this.makshastighet = makshastighet;
    this.kjorelengde = kjorelengde;
  }

  farge = "#FFFFFF";
}

const kjoretoy = new Kjoretoy(120, 500);

class Buss extends Kjoretoy {
  constructor(makshastighet, kjorelengde, maksPassasjerer) {
    super(makshastighet, kjorelengde);
    this.maksPassasjerer = maksPassasjerer;
  }

  sjekkAntall(antallPassasjerer) {
    return antallPassasjerer <= this.maksPassasjerer;
  }

  dagsLeiePris() {
    return this.maksPassasjerer * 100 * 1.25;
  }
}

const buss = new Buss(90, 600, 100);

console.log(buss.sjekkAntall(50));
console.log(buss.dagsLeiePris());

import * as React from "react";
import { Component } from "react-simplified";
import ReactDOM from "react-dom";
import { NavLink, HashRouter, Route } from "react-router-dom";
import { Card, Row, Column, NavBar, Buton, Form } from "";
