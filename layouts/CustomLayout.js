import React, { Component } from 'react';
import Header from "../components/homepage/Header";
import Footer from "../components/homepage/Footer";


class CustomLayout extends Component {
	render () {
	const { children } = this.props;
	return (
	    <div>
			<Header/>
			{children}
			<Footer/>
	    </div>
	);
    }
}

export default CustomLayout;
