class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      name: ''
    };
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleSubtractOne = this.handleSubtractOne.bind(this);
    this.handleResetCounter = this.handleResetCounter.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentDidMount() {
    try {
      const stringCount = localStorage.getItem('count');
      const count = parseInt(stringCount, 10);

      if (!isNaN(count)) {
        this.setState(() => ({
          count
        }));
      }
    } catch (error) {
      
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      const json = JSON.stringify(this.state.count);
      localStorage.setItem('count', json);
    }
  }

  handleNameChange(event) {
    const name = event.target.value;
    this.setState(() => {
      return {
        name: name
      }
    });
  }

  handleAddOne() {
    this.setState((prevState) => ({
      count: prevState.count + 1
    }));
  }

  handleSubtractOne() {
    this.setState((prevState) => {
      return {
        count: prevState.count - 1
      }
    });
  }

  handleResetCounter() {
    this.setState((prevState) => {
      return {
        count: 0
      }
    });
  }
  
  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <h3>Name: {this.state.name}</h3>
        <input 
          onChange={this.handleNameChange} 
          type="text" value={this.state.name}
          placeholder="Write something..."
        />
        <button onClick={this.handleAddOne}>+ 1</button>
        <button onClick={this.handleSubtractOne}>- 1</button>
        <button onClick={this.handleResetCounter}>Reset counter</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));

// let count = 0;
// const addOne = () => {
//   count++;
//   renderCounterApp();
// };

// const subtractOne = () => {
//   count--;
//   renderCounterApp();
// };

// const resetCount = () => {
//   count = 0;
//   renderCounterApp();
// };

// const appRoot = document.getElementById('app');

// const renderCounterApp = () => {
//   const templateTwo = (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={addOne} className="button">+</button>
//       <button onClick={subtractOne} className="button">-</button>
//       <button onClick={resetCount} className="button">Reset</button>
//     </div>
//   );
//   ReactDOM.render(templateTwo, appRoot);
// };

// renderCounterApp();