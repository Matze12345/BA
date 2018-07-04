import React from "react";
import RevolverItem from "./RevolverItem";
export default class Button extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
      		showComponent: false
    	};

		this.toggleShowHide = this.toggleShowHide.bind(this);
		this.toggleShowHideParent = this.toggleShowHideParent.bind(this);
	}

	//wird aufgerufen, wenn RevolverItem angecklickt wurde. Werte werden an die Funktion übergeben.
	toggleShowHide(value, htmlElement){
		var newState = this.state.showComponent == false ? true : false;
		this.setState({showComponent: newState});

		//var mainButton = document.getElementsByTagName('button')[this.props.className].innerHTML = value;
		//var background = document.getElementsByTagName('body')[0];
		//background.style.backgroundColor = "white";
		//background.style.opacity = 1;

		var mainButton = document.getElementById('btnRev').innerHTML = value;

		console.log("click")
	}

	//wird nur aufgerufen, wenn großer Button in der Mitte geklickt wird
	toggleShowHideParent(){
		var newState = this.state.showComponent == false ? true : false;
		this.setState({showComponent: newState});

		//var background = document.getElementsByTagName('body')[0];
		//background.style.backgroundColor = "grey";
		//background.style.opacity = 0.8;
		console.log("click")
	}

	render() {
		const mainButton = {			
			backgroundColor: '#2196F3',
			color: 'white',
			margin: 0,
			marginTop: 0,
			width: 90,
			height: 24,
			borderRadius: 12,
			border: 'none'
		};

		const completeButton = {
			display: 'inline-block',
			position: 'relative',
			//marginLeft: 70,
			marginTop: 10
		};

		var revolverButtons = [];
		for(var i = 1; i <= this.props.maxItems; i++){
			//alert("Schleife: " + i);
			revolverButtons.push(this.state.showComponent && <RevolverItem key={i} htmlElement={this.props.htmlElement} toggleShowHide={this.toggleShowHide} value={this.props.values[i-1]} currentItem={i} maxItems={this.props.maxItems} />);
		}

		return (
			<div style={completeButton}>
				<button id="btnRev" style={mainButton} onClick={this.toggleShowHideParent} onTouchCancel={this.toggleShowHideParent}>{this.props.btnName}</button>
				{revolverButtons}
			</div>
		);
	}
}