import React, { Component } from 'react';
import Footer from '../components/Footer';

class Settings extends Component {
  render() {
    return (
      <div className="questions-page">
        <h1 data-testid="settings-title"> Configurações </h1>
        <Footer />
      </div>
    );
  }
}

export default Settings;
