import React from "react";
import Navbar from "../../common/components/Navbar";
import BaseComponent from "../baseComponent";
import FaqComponent from "./Faqs";

class HomePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <>
        <FaqComponent />
      </>
    );
  }
}

export default HomePage;
