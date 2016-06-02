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
    // const unforgivenGrudge = this.state.grudges.find(grudge => grudge.active);
    const unforgivenGrudges = this.state.grudges.filter(grudge => grudge.status === 'unforgiven');
    const forgivenGrudges = this.state.grudges.filter(grudge => grudge.status === 'forgiven');
    return (
      <div className="grudgeBin">
        <section className="sidebar">
          <header>
            <h1>{this.props.title}</h1>
            <AddGrudge/>
            <GrudgesList grudges={this.state.grudges} unforgiven={unforgivenGrudges.length} forgiven={forgivenGrudges.length} grudgeCount={this.state.grudges.length}/>
          </header>
        </section>
        {/*<section className="main-content">
          <UnforgivenGrudge grudge={unforgivenGrudge}/>
        </section>*/}
      </div>
    );
  }
}

class AddGrudge extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      offense: '',
    };
  }

  updateProperties(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  addNewGrudge(e) {
    e.preventDefault();
    store.create(this.state);
    this.setState({ name: '', offense: '' });
  }

  render() {
    return (
      <div className="AddGrudge">
        <input className="AddGrudge-name"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.updateProperties(e)}
        />
      <textarea className="AddGrudge-offense"
                  name="offense"
                  placeholder="Offense"
                  value={this.state.offense}
                  onChange={(e) => this.updateProperties(e)}
        />
      <input className="AddGrudge-submit"
               type="submit"
               onClick={(e) => this.addNewGrudge(e)}
        />
      </div>
    );
  }
}

const GrudgesList = ({ grudges, unforgiven, forgiven, grudgeCount }) => {
  return (
    <div className="GrudgesList">
      <h3>{grudgeCount} grudges</h3>
      <h4>unforgiven: {unforgiven}</h4>
      <h4>forgiven: {forgiven}</h4>
      {grudges.map(grudge => <GrudgesListItem {...grudge} key={grudge.id}/>)}
    </div>
  );
};

const GrudgesListItem = ({ id, name, offense, status }) => {
  if (status === 'unforgiven') {
    return (
      <div className='GrudgesListItem'>
        <h3 className="GrudgesListItem-name">{name}</h3>
        <h4>status: {status}</h4>
        <div className="GrudgesListItem-offense">{offense}</div>
        <div className="GrudgesListItem-buttons">
          <button onClick={() => store.forgive(id)}>Forgive</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='GrudgesListItem'>
        <h3 className="GrudgesListItem-name">{name}</h3>
        <h4>status: {status}</h4>
        <div className="GrudgesListItem-offense">{offense}</div>
        <div className="GrudgesListItem-buttons">
          <button onClick={() => store.unforgive(id)}>UNFORGIVE</button>
        </div>
      </div>
    );
  }
};

// const UnforgivenGrudge = ({ grudge }) => {
//   if (!grudge) { return <p className="">Please select a jackal.</p>; }
//
//   const updateGrudge = (e) => {
//     const { name, value } = e.target;
//     store.update(grudge.id, Object.assign(grudge, { [name]: value }));
//   };
//
//   return (
//     <div className="ActiveGrudge">
//       <input className="ActiveGrudge-name"
//              name="name"
//              value={grudge.name}
//              onChange={updateGrudge}
//       />
//     <textarea className="ActiveGrudge-offense"
//                 name="offense"
//                 value={grudge.offense}
//                 onChange={updateGrudge}
//       />
//     </div>
//   );
// };

ReactDOM.render(<GrudgeBin title="Grudge Bin"/>, document.querySelector('.application'));
