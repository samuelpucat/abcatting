import React from 'react';

class App2 extends React.Component {
    render() {
        return (
        <div className="shopping-list">
            <h1>Shopping List for {this.props.name}</h1>
            <ul>
            <li>Instagram</li>
            <li>WhatsApp</li>
            <li>Oculus</li>
            <li>Rift</li>
            </ul>
        </div>
        );
    }
}

export default App2;
