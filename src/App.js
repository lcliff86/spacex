import React from 'react';
import Header from './components/Header';
import Picture from './components/Picture';
import List from './components/List';
import './style/index.scss';

function App() {
    return (
        <div>
            <Header className="container"/>
            <main className="container">
                <aside>
                    <Picture/>
                </aside>
                <article>
                    <List/>
                </article>
            </main>
        </div>
    );
}

export default App;
