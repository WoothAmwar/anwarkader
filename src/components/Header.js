import React, { Component } from "react";
import Typical from "react-typical";
import Switch from "react-switch";

class Header extends Component {
  titles = [];

  constructor() {
    super();
    this.state = { checked: false };
    this.onThemeSwitchChange = this.onThemeSwitchChange.bind(this);
  }

  onThemeSwitchChange(checked) {
    this.setState({ checked });
    this.setTheme();
  }

  setTheme() {
    var dataThemeAttribute = "data-theme";
    var body = document.body;
    var newTheme =
      body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
  }

  render() {
    if (this.props.sharedData) {
      var name = this.props.sharedData.name;
      this.titles = this.props.sharedData.titles.map(x => [ x.toUpperCase(), 1500 ] ).flat();
    }

    const HeaderTitleTypeAnimation = React.memo( () => {
      return <Typical className="title-styles" steps={this.titles} loop={50} />
    }, (props, prevProp) => true);

    // TODO - change hte following value of header_height to take up a certain percentage of space on screen
    //    window.innerHeight equals the height of the entire screen, no matter what device you are using
    //   The value of window.innerHeight is in pixels, so -140 makes it 140 pixels smaller. You can also
    //    do division or multiplication to window.innerHeight, so something like 
    //    header_height = window.innerHeight / 2; Will divide height by 2. Multiplication is done with an asterisk (*)
    //      and division is done with the slash (/). Addition (+) and subtraction (-) are normal. 
    //    Exponents is done with (**), so 10 squared, or 10*10, can be written as 10**2. 
    const header_height = window.innerHeight - 140;
    return (
      <header id="home" style={{ height: header_height, display: 'block' }}>
        <div className="row aligner" style={{height: '100%'}}>
          <div className="col-md-12">
            <div>
              {/* TODO - Delete/Remove the line below to get rid of the laptop icon above the name */}
              {/* If you want to choose a different icon, do the following
              1. Go to https://icon-sets.iconify.design/
              2. Select some icon, doesn't matter what. You can also search for key words
              3. When you find an icon, find where it says "Icon name:"
              4. Next to "Icon name", there should be some text. Copy that text 
              5. Replace the value of "data-icon" below with what you just copied. So it should look like
                                                    data-icon="COPIED TEXT" */}
              <span className="iconify header-icon" data-icon="emojione:money-bag" data-inline="false"></span>
              <br/>
              <h1 className="mb-0">
                <Typical steps={[name]} wrapper="p" />
              </h1>
              <div className="title-container">
                <HeaderTitleTypeAnimation />
              </div>
              {/* TODO - If you don't want the switch that changes the website to light and dark mode,
              delete the following text until told to stop (stop around line 100, you will see a message to stop*/}
              <Switch
                checked={this.state.checked}
                onChange={this.onThemeSwitchChange}
                offColor="#baaa80"
                onColor="#353535"
                className="react-switch mx-auto"
                width={90}
                height={40}
                uncheckedIcon={
                  <span
                    className="iconify"
                    data-icon="twemoji:owl"
                    data-inline="false"
                    style={{
                      display: "block",
                      height: "100%",
                      fontSize: 25,
                      textAlign: "end",
                      marginLeft: "20px",
                      color: "#353239",
                    }}
                  ></span>
                }
                checkedIcon={
                  <span
                    className="iconify"
                    data-icon="noto-v1:sun-with-face"
                    data-inline="false"
                    style={{
                      display: "block",
                      height: "100%",
                      fontSize: 25,
                      textAlign: "end",
                      marginLeft: "10px",
                      color: "#353239",
                    }}
                  ></span>
                }
                id="icon-switch"
              />
              {/* DELETE UP TO HERE TO GET RID OF THE SLIDER FOR LIGHT/DARK MODE */}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
