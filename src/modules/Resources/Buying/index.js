import React from "react";
import BaseComponent from "../../baseComponent";
import BuyComponent from "./Buy";


class HomePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <>
        <BuyComponent />
      </>
    );
  }
}

export default HomePage;
