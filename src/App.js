import React, {Component} from 'react';
import './App.scss';

import FlexGrid from "./components/FlexGrid"
//import {data} from "./components/FlexGrid/testdata";


export default class App extends Component {
	constructor(props){
		super(props);

		this.columns = React.createRef();
		this.columns.current = [];

		this.state = {
			checked: true
		};
	}

	toggle = () => {
		this.setState((prevState)=>{
			return {
				checked: !prevState.checked
			}
		});
	};

	render(){
		let data = [
			[	(<span>
					Test
					<input type="checkbox" name="test" value="1" checked={this.state.checked} onChange={this.toggle}/>
				</span>),
				(<span>
					John
					{this.state.checked ? <br/> : ""}
					{this.state.checked ? "This is a test" : ""}
					
				</span>),
				"Steve","Susan","Peter","Roger","David"
			],
			["Age",5,15,30,20,33,50],
			["Favorite Color","Red",(<span>
					Blue
					{this.state.checked ? <br/> : ""}
					{this.state.checked ? "This is a test" : ""}
					{this.state.checked ? <br/> : ""}
					{this.state.checked ? "This is a test" : ""}
				</span>),"green","orange","Yellow","Purple"],
			["Single","Yes","Yes","No","Yes","Its Complicated","No Answer"],
			["Pets",1,2,0,5,4,1],
			["HTML",(<strong>Blue</strong>),"blue","green","orange","Yellow","Purple"],
			["Favorite Color","Red","blue","green","orange","Yellow","Purple"],
			["DOB","1/1/2016","2/1/2006","1/1/2000","1/1/2000","1/1/2000","1/1/2000"],
			["Alergies","None","Pollen","None","Fur","Dust","None"]
		];

		return (
			<div className="App">
				<FlexGrid 
					data={data} 
					ref={c => (this.me = c)} 
					className="blue" 
					startColumnIndex={3} 
					startColumnCentered={false} 
					firstColumnFixed={true}
					fixedHeader={false}
					snapScrollToColumn={false}/>
			</div>
		);
	}	
}
