
export default class DraftBoardCell extends HTMLElement {

	static get styles() {
		return `
		<style>
		.cell{
			width: 110px;
			height: 60px;
			background-color: #FFF;
			border-style: solid;
			border-color: #F00;
		}
		</style>
		`
	}
  
	static get markup() { 
		return `
		<div class="cell">Football Player</div>
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
	}
  
	addEventListeners() {
	}
	
	removeEventListeners() {
	}
}

customElements.define('draft-board-cell', DraftBoardCell);
