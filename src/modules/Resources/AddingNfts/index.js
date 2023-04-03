import React from "react";
import BaseComponent from "../../baseComponent";
import Nfts from "./Nfts";


class HomePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <>
        <Nfts />
      </>
    );
  }
}

export default HomePage;
