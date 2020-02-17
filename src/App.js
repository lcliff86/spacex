import React from 'react';
import Header from './components/Header';
import Picture from './components/Picture';
import List from './components/List';
import './style/index.scss';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            launches: [],
            isLoading: false,
            filterOpen: false,
            ascending: true,
            error: null,
            reload: false
        }

        this.getLaunches = this.getLaunches.bind(this);
    }

    getLaunches() {
        // set loading to true
        this.setState({
            isLoading: true,
            reload: true
        });
        // get launch data
        fetch('https://api.spacexdata.com/v3/launches')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong ...');
            }
        })
        .then((data) => {
            this.setState({
                launches: data, // launch data, not touched
                isLoading: false, // got data so no longer loading
                filterOpen: false,
                ascending: true,
                reload: false,
                error: false
            });
            console.log(this.state.launches);
        })
        .catch(error => this.setState({ error, isLoading: false }))
    }

    componentDidMount() {
        // get list here from API
        this.getLaunches();
    }

    render() {
        return (
            <div>
                <Header className="container" action={this.getLaunches}/>
                <main className={"container " + (this.state.isLoading ? '' : 'show')}>
                    <aside>
                        <Picture/>
                    </aside>
                    <article>
                        <List settings={this.state}/>
                    </article>
                </main>
            </div>
        );
    }
}

export default App;
