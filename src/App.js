import React, { Component } from "react";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      foo: "bar",
      resumeData: {},
      sharedData: {},
    };
  }

  applyPickedLanguage(pickedLanguage, oppositeLangIconId) {
    this.swapCurrentlyActiveLanguage(oppositeLangIconId);
    document.documentElement.lang = pickedLanguage;
    var resumePath =
      document.documentElement.lang === window.$primaryLanguage
        ? `res_primaryLanguage.json`
        : `res_primaryLanguage.json`;
    this.loadResumeFromPath(resumePath);
  }

  swapCurrentlyActiveLanguage(oppositeLangIconId) {
    var pickedLangIconId =
      oppositeLangIconId === window.$primaryLanguageIconId
        ? window.$primaryLanguageIconId
        : window.$primaryLanguageIconId;
    document
      .getElementById(oppositeLangIconId)
      .removeAttribute("filter", "brightness(40%)");
    document
      .getElementById(pickedLangIconId)
      .setAttribute("filter", "brightness(40%)");
  }

  componentDidMount() {
    this.loadSharedData();
    document.documentElement.lang = window.$primaryLanguage;
    this.loadResumeFromPath(`res_primaryLanguage.json`);
  }

  loadResumeFromPath(path) {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  }

  loadSharedData() {
  $.ajax({
    url: `portfolio_shared_data.json`,
    dataType: "json",
    cache: false,
    success: function (data) {
      this.setState({ sharedData: data });
      document.title = `${data.basic_info.name}`;
    }.bind(this),
    error: function (xhr, status, err) {
      alert(err);
    },
  });
}


  render() {
    return (
      <>
        {this.state.sharedData.basic_info && (
          <Header sharedData={this.state.sharedData.basic_info} />
        )}

        {/* Deleted the div with classNames "col-md-12 mx-auto text-center language" */}

        {this.state.resumeData.basic_info && (
          <>
            <About
              resumeBasicInfo={this.state.resumeData.basic_info}
              sharedBasicInfo={this.state.sharedData.basic_info}
            />
            <Projects
              resumeProjects={this.state.resumeData.projects}
              resumeBasicInfo={this.state.resumeData.basic_info}
            />
            {/* TODO - If you want to get rid of the Entire Skills senction, delete
            until told to stop */}
            <Skills
              sharedSkills={this.state.sharedData.skills}
              resumeBasicInfo={this.state.resumeData.basic_info}
            />
            {/* STOP DELETING HERE TO DELETE ALL SKILLS SECTION */}
            <Experience
              resumeExperience={this.state.resumeData.experience}
              resumeBasicInfo={this.state.resumeData.basic_info}
            />
          </>
        )}
        {this.state.sharedData.basic_info && (
          <Footer sharedBasicInfo={this.state.sharedData.basic_info} />
        )}
      </>
    );
  }
}

export default App;
