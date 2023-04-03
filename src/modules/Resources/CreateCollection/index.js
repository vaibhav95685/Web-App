import React from "react";
import BaseComponent from "../../baseComponent";
import CollectionComponent from "./CreateCollection";


class HomePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <>
        <CollectionComponent />
      </>
    );
  }
}

export default HomePage;
