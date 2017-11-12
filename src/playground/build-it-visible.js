class VisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: 'Visibility Toggle',
      message: 'Some message is shown now',
      visibility: false
    };
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
  }

  handleToggleVisibility() {
    this.setState((prevState) => {
      return {
        visibility: !prevState.visibility
      }
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.heading}</h1>
        <button onClick={this.handleToggleVisibility}>{this.state.visibility ? 'Hide details' : 'Show details'}</button>
        {
          this.state.visibility &&
          <p>{this.state.message}</p>
        }
      </div>
    );
  }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));

// const app = {
//   heading: 'Visibility Toggle',
//   showDetails: false
// };

// const onShowDetails = () => {
//   app.showDetails = !app.showDetails;
//   renderApplication();
// };

// const renderApplication = () => {
//   const template = (
//     <div>
//       <h1>{app.heading}</h1>
//       <button onClick={onShowDetails}>{app.showDetails ? 'Hide details' : 'Show details'}</button>
//       {app.showDetails && (
//         <p>Details are now shown</p>
//       )}
//     </div>
//   );
//   ReactDOM.render(template, document.getElementById('app'));
// };

// renderApplication();
