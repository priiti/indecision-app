import React from 'react';

import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';
import NProgress from 'nprogress';

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selectedOption: undefined
    };
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteSingleOption = this.handleDeleteSingleOption.bind(this);
    this.handleSelectedOptionState = this.handleSelectedOptionState.bind(this);
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (error) {
            
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  componentWillUnmount() {
    console.log('Component will unmount')
  }

  handleSelectedOptionState() {
    this.setState(() => ({
      selectedOption: undefined
    }));
  }

  handleDeleteOptions() {
    this.setState(() => ({
      options: []
    }));
  }

  handleDeleteSingleOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => option !== optionToRemove)
    }));
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option
    }));
  }

  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item.';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists.';
    }
    this.setState((prevState) => ({
      options: [...prevState.options, option]
    }));
  }

  render() {
    const subtitle = 'Make your decision!';
    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action 
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options 
              handleDeleteOptions={this.handleDeleteOptions} 
              options={this.state.options}
              handleDeleteSingleOption={this.handleDeleteSingleOption}
            />
            
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
          <OptionModal 
            selectedOption={this.state.selectedOption} 
            handleSelectedOptionState={this.handleSelectedOptionState}
          />
        </div>
      </div>
    );
  }
}

export default IndecisionApp;
