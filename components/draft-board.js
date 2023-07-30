import './draft-board-cell.js';

export default class DraftBoard extends HTMLElement {

	static get styles() {
		return `
		<style>
		.board{
			width: 100%;
			height: 100%;
			background-color: #0F0;
			border-style: solid;
			border-color: #F00;
		}
		.row{
			display:flex;
		}
		</style>
		`
	}
  
	static get markup() { 
		return `
		<div class="board">
		</div>
		`
	}
 
	static get observedAttributes() { 
		return ['message'];
	}

	constructor() {
		super();
		const template = document.createElement('template');
		template.innerHTML = this.constructor.styles + this.constructor.markup;

		this.attachShadow( { mode: 'open' });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.initializeElements();
	}
  
    connectedCallback() {
        this.addEventListeners();
    }
    
    disconnectedCallback() {
        this.removeEventListeners();
    }

    attributeChangedCallback(name, oldValue, newValue){
    }
    
	initializeElements() {
		this.board = this.shadowRoot.querySelector('.board');
		this.createRows();
	}
  
	addEventListeners() {
	}
	
	removeEventListeners() {
	}

	createRows(){
		for(let i = 0; i < 17; ++i){
			let row = document.createElement('div');
			row.classList.add('row');
			for(let j = 0; j < 12; ++j){
				row.append(document.createElement('draft-board-cell'));
			}
			this.board.append(row);
		}
	}
}

customElements.define('draft-board', DraftBoard);
