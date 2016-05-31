const React = require('react');
const ReactDOM = require('react-dom');
const store = require('./data-store');

require('./reset.css');
require('./styles.scss');

class GrudgeBin extends React.Component {
  constructor() {
    super();
    this.state = {
      grudges: store.all(),
    };
  }

  componentDidMount() {
    store.on('change', grudges => {
      this.setState({ grudges });
    });
  }

  render() {
    const activeIdea = this.state.grudges.find(grudge => grudge.active);

    return (
      <div className="grudgeBin">
        <section className="sidebar">
          <header>
            <h1>{this.props.title}</h1>
          </header>
        </section>
      </div>
    )
  }
}

ReactDOM.render(<GrudgeBin title="Grudge Bin"/>, document.querySelector('.application'));
