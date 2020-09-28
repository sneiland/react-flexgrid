import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * FlexGridColumn - Representation of a single column of row data within the grid.
 */
export default class FlexGridColumn extends Component {

	constructor(props){
		super(props);

		this.state = {
			minHeights: []
		};
	}

	componentDidMount() {
		console.log('componentDidMount_column');
		this.updateHeights();
	}

	componentDidUpdate(prevProps){
		if( prevProps.rowHeights !== this.props.rowHeights){
			this.setState({
				minHeights: this.props.rowHeights
			},()=>{
				if( this.state.minHeights.length === 0 ){
					this.updateHeights();
				}
			});
		}
	}

	getRowHeight(rowIndex) {
		return document.getElementById(
			`${this.props.namespace}_row_${this.props.index}_${rowIndex}`
		).clientHeight;
	}
	

	updateHeights = () => {
		let rowHeights = this.props.data.map((row,index)=>{
			return this.getRowHeight(index);
		});
		this.props.updateMaxHeights(rowHeights, this.props.index);
	}

	renderRow( data, index ){
		const minHeights = this.props.rowHeights;
		const className = index === 0 ? "header" : "row" ;

		/** 
		 * In order to access the height of each cell we need to give it a unique id
		 * We cannot use a ref since this causes issues with trying to access the updated client
		 * height after re-rendering occurs
		*/ 
		const rowId = `${this.props.namespace}_row_${this.props.index}_${index}`;

		let styleObj = {};
		if( minHeights.length && minHeights[index] > 0 ){
			styleObj.minHeight = minHeights[index];
		}

		return (
			<div className={`flexgrid--container-column-${className}`} id={rowId} style={styleObj} key={index}>
				<div className={`flexgrid--container-column-${className}Content`}>
					{data}
				</div>
			</div>
		);
	}

	renderRows(){
		return this.props.data.map((rowdata,index)=>{
			return this.renderRow(rowdata,index);
		});
	}
	
	render(){
		const columnId = `${this.props.namespace}_column_${this.props.index}`;

		return (
			<div className="flexgrid--container-column" id={columnId}>
				{this.renderRows()}
			</div>
		);
	}
}

FlexGridColumn.propTypes = {
	/** The data for this specific column */
	data: PropTypes.array.isRequired,
	/** In order to prevent the different column scroll events from stepping on each other we track them by index and block all but the final one*/
	index: PropTypes.number.isRequired,
	/** A unique generated namespace for the grid columns to facilitate targeting cells for height calculations */
	namespace: PropTypes.string,
	/** Callback to the parent to record the heights of each header and row */
	updateMaxHeights: PropTypes.func.isRequired,
	/** Row heights to be passed in after initial rendering and calculation or max values across columns to align each row height */
	rowHeights: PropTypes.array.isRequired
};

FlexGridColumn.defaultProps = {
	namespace: "",
	rowHeights: []
}