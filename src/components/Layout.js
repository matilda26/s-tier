import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import 'assets/stylesheets/application.scss';

import Header from 'components/Header';
import Footer from 'components/Footer';

const Layout = ({ children, pageName }) => {

  let className = '';

  if ( pageName ) {
    className = `${className} page-${pageName}`;
  }
  // TODO: Favicon

  return (
    <>
      <Helmet bodyAttributes={{ class: className}}>
        <title>s-tier generator</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main>{ children }</main>
        <Footer />
      </div>
    </>
  );

};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;