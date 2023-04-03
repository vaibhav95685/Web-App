import React from "react";
import BaseComponent from "../../baseComponent";
import SellComponent from "./Selling";


class HomePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  

  componentDidMount() {}
  render() {
    return (
      <>
        <SellComponent />
      </>
    );
  }
}

export default HomePage;
