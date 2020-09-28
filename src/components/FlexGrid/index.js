import React, { Component } from "react";
import PropTypes from "prop-types";
import FlexGridColumn from "./Column";
import "./index.scss";

export default class FlexGrid extends Component {
	constructor(props){
		super(props);

		this.columns = React.createRef();
		this.columns.current = [];
		this.namespace = `ResponsiveGrid_${Math.floor((Math.random() * 1000000) + 1)}`;
		this.leftButtonId = `${this.namespace}-left`;
		
		this.scrollIndex = this.props.startColumnIndex;
		this.resizeTimer = null;

		this.containerClassName = `flexgrid--container ${this.props.className}`;
		if( this.props.fixedHeader ){
			this.containerClassName += ' fixedHeader';
		}
		if( this.props.firstColumnFixed ){
			this.containerClassName += ' fixedFirstColumn';
		}

		this.state = {
			columnRowHeights: [],
			columnWidths: [],
			containerWidth: 0
		};
	}

	componentDidMount() {
		const {
			showNav,
			startColumnCentered,
			startColumnIndex
		} = this.props;

		this.attachEventListeners();
		this.updateWidths();

		if( showNav && startColumnIndex > 0 ){
			clearTimeout(this.resizeTimer);
			this.resizeTimer = setTimeout(()=>{
				if( startColumnCentered ){
					this.scrollToColumnCentered( this.scrollIndex );
				} else {
					this.scrollToColumn( this.scrollIndex );
				}
			},500);
		}
	}

	componentDidUpdate(prevProps){
		if(prevProps.data !== this.props.data){
			// Reset the column heights in state if the data changes to trigger a recalculation of the row heights
			this.setState({
				columnRowHeights: []
			});
		}
	}

	componentWillUnmount() {
		this.detachEventListeners();
	}

	addColumnRef = (el) => {
		if( el && !this.columns.current.includes(el)){
			this.columns.current.push(el);
		}
	}

	attachEventListeners(){
		window.addEventListener('resize', this.handleResize);
	}

	detachEventListeners(){
		window.removeEventListener("resize", this.handleResize);
	}

	getColumnWidth(columnIndex) {
		return document.getElementById(
			`${this.namespace}_column_${columnIndex}`
		).clientWidth;
	}

	getContainerWidth() {
		return this.getContainer().clientWidth
	}

	getContainer() {
		return this.getWrapper().getElementsByClassName(this.containerClassName)[0];
	}

	getLeftNavButton(){
		return document.getElementById( this.leftButtonId );
	}

	getNav(){
		return this.getWrapper().getElementsByClassName("flexgrid--nav")[0];
	}

	getWrapper() {
		return document.getElementById(this.namespace);
	}

	/**
	 * Returns an array of row heights where each value represents the max height of that row position across all the columns
	 */
	getMaxRowHeights = () => {
		const {
			columnRowHeights
		} = this.state;

		let maxRowHeights = [];

		if( columnRowHeights.length && columnRowHeights.length === this.props.data.length ){
			columnRowHeights.forEach((column)=>{
				column.heights.forEach((rowHeight,index)=>{
					// Set initial value for each row height if not defined 
					if( (index+1) > maxRowHeights.length ){
						maxRowHeights.push(0);
					}
					
					if( maxRowHeights[index] < rowHeight ){
						maxRowHeights[index] = rowHeight;
					}
				});
			});
		}

		return maxRowHeights;
	}

	getScrollLeft() {
		return this.getContainer().scrollLeft;
	}

	/**
	 * After the user has finished resizing update the columns widths array
	 */
	handleResize = () => {
		this.updateWidths();

		clearTimeout(this.resizeTimer);
		this.resizeTimer = setTimeout(()=>{
			this.scrollToColumn(this.scrollIndex);
		},100);
	}

	navVisible(){
		const totalWidths = this.state.columnWidths.reduce((accumulator,current)=>{
			return accumulator + current;
		},0);

		console.info('navvisible',this.props.showNav && totalWidths > this.state.containerWidth);

		return this.props.showNav && totalWidths > this.state.containerWidth;
	}

	positionNavigation(){
		const columnRowHeights = this.getMaxRowHeights();
		const { columnWidths } = this.state;

		if( columnRowHeights.length ){
			this.getNav().style.top = `${columnRowHeights[0]}px`;
		}

		if( columnWidths.length ){
			this.getLeftNavButton().style.left = `${columnWidths[0]}px`;
		}
	}

	scrollToColumn(index){
		const startingIndex = this.scrollIndex;
		const startingPosition = this.getScrollLeft();

		const sliceStart = this.props.firstColumnFixed ? 1 : 0;
		if( index > sliceStart-1 && index <= this.props.data.length-1 ){
			this.scrollIndex = index;
		}

		const leftColumns = this.state.columnWidths.slice(sliceStart,this.scrollIndex);
		const scrollLeft = leftColumns.reduce((accumulator,current)=>{
			return accumulator + current;
		},0);

		if( scrollLeft >= 0 ){
			this.setScrollLeft( scrollLeft );
			// Lock the scrolling index to the last successful index
			if( this.getScrollLeft() === startingPosition ){
				this.scrollIndex = startingIndex;
			}
		}
	}

	scrollToColumnCentered(index){
		console.group('scrollToColumnCentered');

		const { columnWidths, containerWidth } = this.state;
		const firstWidth = this.getColumnWidth(0);
		const selectedColumnWidth = this.getColumnWidth(index);
		const totalWidth = columnWidths.reduce((accumulator,current)=>{
			return accumulator + current;
		},0);
		
		console.log( columnWidths );
		console.info( 'firstWidth', firstWidth );
		console.info( 'containerWidth', containerWidth );
		console.info('selectedColumnWidth',selectedColumnWidth);
		console.info( 'totalWidth', totalWidth );
		if( this.props.firstColumnFixed ){

		} else {
			const leftColumnsWidth = columnWidths.slice(0,index).reduce((accumulator,current)=>{
				return accumulator + current;
			},0);

			console.info( 'leftColumnsWidth', leftColumnsWidth );

			let targetPosition = leftColumnsWidth - (containerWidth/2) + (selectedColumnWidth/2);

			console.log( targetPosition );

			if( this.props.snapScrollToColumn ){
				// If the targetPosition is not an exact match for a column start position scroll right to the next column

				// get total columns fully visible left
				// get total columns fully visible right
				// sum the 2 values plus the selected column width
				// subtract this from the total container width
				// divide the remainer by 2
				// find the column left or right which is closest in size to this value
				// if left is closer then snap to the start of that column
				// if right is closer snap to the left column plus its own width

				let widthsTotal = 0;
				for( var i=0; i<=columnWidths.length; i++ ){
					widthsTotal += columnWidths[i];
					if( widthsTotal >= targetPosition ){
						targetPosition = widthsTotal;
						break;
					}
				}
			}

			console.log( targetPosition );
			console.info( 'targetPosition', targetPosition );

			if( targetPosition > 0 ){
				this.setScrollLeft(targetPosition);
			}

			//const selectedColumnStart = 
		}
		console.groupEnd();
	}

	setScrollLeft( scrollLeft ){
		this.getContainer().scrollLeft = scrollLeft;
	}

	updateMaxHeights = (heights, columnIndex) => {
		this.setState((prevState)=>{
			let columnRowHeights = prevState.columnRowHeights;
			const index = columnRowHeights.findIndex((column)=>{
				return column.columnIndex === columnIndex;
			});

			if( index > -1 ){
				columnRowHeights[index] = {
					heights,
					columnIndex
				};
			} else {
				columnRowHeights.push({
					heights,
					columnIndex
				});
			}

			return {columnRowHeights};
		});
	}

	updateWidths = () => {
		this.setState(()=>{
			const columnWidths = this.props.data.map((column,index)=>{
				return this.getColumnWidth(index);
			});
			const containerWidth = this.getContainerWidth();

			return {
				columnWidths, 
				containerWidth
			};
		},
		()=>{
			if( this.navVisible() ){
				this.positionNavigation();
			}
		}
		);
		
	}

	renderNav(){
		return (
			<div className="flexgrid--nav">
				<button onClick={()=>{this.scrollToColumn(this.scrollIndex+1)}} className="flexgrid--nav-button flexgrid--nav-right">&raquo;</button>
				<button onClick={()=>{this.scrollToColumn(this.scrollIndex-1)}} className="flexgrid--nav-button flexgrid--nav-left" id={this.leftButtonId}>&laquo;</button>
			</div>
		);
	}

	render(){
		const columns = this.props.data.map((columnData,index)=>{
			return (
				<FlexGridColumn 
					data={columnData} 
					index={index}
					key={index} 
					namespace={this.namespace}
					ref={this.addColumnRef}
					rowHeights={this.getMaxRowHeights()}
					updateMaxHeights={this.updateMaxHeights}  />
			);
		});

		return (
			<div className="flexgrid--wrapper" id={this.namespace}>
				<div className={this.containerClassName}>
					{columns}
				</div>
				{this.navVisible() ? this.renderNav() : null}
			</div>
		);
	}
}

FlexGrid.propTypes = {
	/** An optional class to add to the container div for custom styling */
	className: PropTypes.string,
	/** An array of arrays where each individual child array represent a column (ordered from left to right) of rows in descending order. */
	data: PropTypes.arrayOf(PropTypes.array).isRequired,
	/** Flag to enable the fixed header function in tandem with setting a fixed height rule on the container via css */
	fixedHeader: PropTypes.bool,

	firstColumnFixed: PropTypes.bool,
	startColumnIndex: PropTypes.number,
	startColumnCentered: PropTypes.bool,
	snapScrollToColumn: PropTypes.bool,
	showNav: PropTypes.bool,
};

FlexGrid.defaultProps = {
	className: "",
	fixedHeader: true,
	firstColumnFixed: true,
	startColumnIndex: 0,
	startColumnCentered: false,
	snapScrollToColumn: false,
	showNav: true
};
