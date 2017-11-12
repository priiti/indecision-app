class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteSingleOption = this.handleDeleteSingleOption.bind(this);
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
    alert(`Your option is: \n ${this.state.options[randomNum]}`);
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
    const subtitle = 'Put your life in the hands of a computer!';
    return (
      <div>
        <Header subtitle={subtitle} />
        <Action 
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options 
          handleDeleteOptions={this.handleDeleteOptions} 
          options={this.state.options}
          handleDeleteSingleOption={this.handleDeleteSingleOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

const Header = (props) => {
  return (
      <div>
        <h1>{props.title}</h1>
        {props.subtitle && <h2>{props.subtitle}</h2>}
      </div>
    );
};

Header.defaultProps = {
  title: 'Indecision'
};

const Action = (props) => {
  return (
      <div>
        <button 
          onClick={props.handlePick}
          disabled={!props.hasOptions}
        >
          What should I do?
        </button>
      </div>
    );
};

const Options = (props) => {
  return (
      <div>
        <button onClick={props.handleDeleteOptions}>Remove All</button>
        { props.options.length === 0 && <p>Please add an option to get started.</p>}
        <ol>
          {
            props.options.map((option, index) => 
              <Option 
                handleDeleteSingleOption={props.handleDeleteSingleOption}
                key={index} 
                value={option} 
              />
            )
          }
        </ol>
      </div>
    );
};

const Option = (props) => {
  return (
      <div>
        <li>{props.value}</li>
        <button
          onClick={(e) => {
            props.handleDeleteSingleOption(props.value);
          }}
        >
        Remove
        </button>
      </div>
    );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: undefined
    };
    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleAddOption(event) {
    event.preventDefault();
    const option = event.target.elements.option.value;
    const errorMessage = this.props.handleAddOption(option);
    this.setState(() => ({ errorMessage }));
    if (!errorMessage) {
      event.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <div>
        {
          this.state.errorMessage && <p>{this.state.errorMessage}</p>
        }
        <form onSubmit={this.handleAddOption}>
          <input name="option" type="text" placeholder="Add a new option"/>
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
