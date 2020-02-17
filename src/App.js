import React from 'react';
import Header from './components/Header';
import Picture from './components/Picture';
import './style/index.scss';

function App() {
    return (
        <div>
            <Header/>
            <main>
                <aside>
                    <Picture/>
                </aside>
                <article>
                    <form>
                        <div data-filter-year></div>
                        <button data-sort>Sort Descending</button>
                    </form>
                    <div class="launches">
                        <div class="launch">
                            <span class="number">#1</span>
                            <span class="name">FalconSat</span>
                            <div class="details">
                                <span class="date">24th Mar 2006</span><span class="rocket">Falcon 1</span>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
}

export default App;
