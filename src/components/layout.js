import React from "react";
import Header from "./header";
import Footer from "./footer";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  render() {
    setTimeout(() => {
      this.setState({title:"Welcome Angelo"});
    }, 1000);

    return (
      <div>
        {this.state.title}
        <Header />
        <Footer />
      </div>
    );
  }
}