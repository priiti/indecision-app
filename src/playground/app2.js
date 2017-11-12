const app = {
  title: 'Indecision App',
  subtitle: 'Add something to decision making application',
  message: 'Hello, feel free to use this app.',
  options: []
};

const onFormSubmit = (event) => {
  event.preventDefault();
  const option = event.target.elements.option.value;
  if (option) {
    app.options.push(option);
    event.target.elements.option.value = '';
    renderApplication();
  }
};

const onRemoveAllOptions = () => {
  app.options = [];
  renderApplication();
};

const onMakeDecision = () => {
  const randomNumber = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNumber];
  alert(option);
};

const appRoot = document.getElementById('app');

const renderApplication = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <button disabled={!app.options.length} onClick={onMakeDecision}>What should I do?</button>
      <button onClick={onRemoveAllOptions}>Remove All</button>
        <ol>
          {
            app.options.map((option, index) => {
              return (<li key={index}>{option}</li>);
            })
          }
        </ol>
        <form onSubmit={onFormSubmit}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
    </div>
  );
  ReactDOM.render(template, appRoot);
};

renderApplication();
