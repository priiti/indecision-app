import React from 'react';

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
          this.state.errorMessage && <p className="add-option-error">{this.state.errorMessage}</p>
        }
        <form 
          onSubmit={this.handleAddOption}
          className="add-option"
        >
          <input className="add-option__input" name="option" type="text" />
          <button className="button">Add Option</button>
        </form>
      </div>
    );
  }
}

export default AddOption;
