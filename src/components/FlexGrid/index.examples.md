<style>
	.flexgrid--main.blue {
		background-color: #9999dd;
	} 
	.flexgrid--main.blue .flexgrid--main-column-rowContent {
		padding: 10px;
		text-align:center;
	} 

	.flexgrid--main.short{
		height:100px;
	} 

	.flexgrid--main.red {
		background-color: #ff99dd;
	} 
	.flexgrid--main.red .flexgrid--main-column:first-child .flexgrid--main-column-rowContent {
		background-color: #ff6666;
	} 
	.flexgrid--main.red .flexgrid--main-column-headerContent {
		padding:10px 5px;
	} 
	.flexgrid--main.red .flexgrid--main-column-rowContent {
		padding: 10px;
		background-color: #ff99dd;
	} 
	.flexgrid--main.red .flexgrid--main-column:not(:first-child) .flexgrid--main-column-rowContent {
		text-align:center;
	} 
</style>

### Basic setup


```js { "props": { "style": { "background": "#f5f5f5" } } }
import { FlexGrid } from "FlexGrid";

const columnsArray = [
	["Names","John","Peter"],
	["Age",5,9],
	["Favorite Color","Blue","Red"]
];

<FlexGrid data={columnsArray}/>;
```


### Styling

By default the responsive grid ships with minimal styling revolving around the grid layout. To add to this styling
you can either override the defined styles in the index.scss file OR specify a classname to the component to increase 
the specitivity of the styling.

The basic styles are broken down as follows.  

##### Outermost main
.flexgrid--main {}

##### A column of the grid
.flexgrid--main-column {}

##### A columns header
.flexgrid--main-column-header {}

##### The header content
.flexgrid--main-column-headerContent {}

##### The rows main of a column excluding the header
.flexgrid--main-column-rows {}

##### A single row within the rows main
.flexgrid--main-column-row {}

##### The row content
.flexgrid--main-column-rowContent {}


**Note**: That each row has an inner 'Content' div. This is to allow styling the rendered content of that cell independently
of the cell itself to fix issues with maintaining even row heights across columns. If a height,margin,padding rule 
applied to a row or header does not work as intended do to the auto sizing, targetting the (header/row)Content div class 
instead should resolve the issue. 

```

/*
<style>
	.flexgrid--main.blue {
		background-color: #9999dd;
	} 

	.flexgrid--main.blue .flexgrid--main-column-rowContent {
		padding: 10px;
		text-align:center;
	} 
</style>
*/

const data = [
	["Names","John","Peter"],
	["Age",5,9]
];

<FlexGrid data={data}  className="blue"/>
```
```
const data = [
	["Names","John","Peter","Lisa"],
	["Age",5,9,10],
	["Favorite Color","Blue","Orange","Green"],
	["Pet(s)","Dog","GoldFish","Cat and Dog"],
	["Favorite Class","History","English","Math"],
	["Can Swim","Yes","No","No"],
	["Favorite Class","History","English","Math"],
	["Favorite Class","History","English","Math"],
	["Favorite Class","History","English","Math"],
	["Favorite Class","History","English","Math"],
	["Favorite Class","History","English","Math"],
	["Favorite Class","History","English","Math"],
	["Age",5,9,1]
];
/*
<style>
	.flexgrid--main.red {
		background-color: #ff99dd;
	} 
	.flexgrid--main.red .flexgrid--main-column:first-child .flexgrid--main-column-rowContent {
		background-color: #ff6666;
	} 
	.flexgrid--main.red .flexgrid--main-column-headerContent {
		padding:10px 5px;
	} 
	.flexgrid--main.red .flexgrid--main-column-rowContent {
		padding: 10px;
		background-color: #ff99dd;
	} 
	.flexgrid--main.red .flexgrid--main-column:not(:first-child) .flexgrid--main-column-rowContent {
		text-align:center;
	} 
</style>
*/
<FlexGrid data={data}  className="red"/>
```

### Fixed Header Row

By default the left column of the grid remains fixed, however it is also possible to fixed the header row of the grid. To 
do this create a class to set a fixed height on the main and set the component property fixedHeader to true.

```
const data = [
	["Names","John","Peter","Sarah","Luke","David","Roger","Andrew"],
	["Age",5,9,1,2,3,4,5]
];

/*
<style>
	.flexgrid--main.short {
		height: 100px;
	}
</style>
*/

<FlexGrid data={data} fixedHeader={true} className="short"/>
```
