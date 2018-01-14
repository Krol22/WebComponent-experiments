class DialogComponent extends HTMLElement {

    static get observedAttributes() {
        return ['open'];
    }

    constructor() {
        super();

        this._open = false;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });

        var template = this.currentDocument.querySelector('#dialog-component');
        var instance = template.content.cloneNode(true);

        this.shadowRoot.appendChild(instance);

        this.background = this.shadowRoot.querySelector('#backdrop');
        this.dialog = this.shadowRoot.querySelector('#dialog');
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        if(attributeName === 'open') {
            if(newValue === 'true') {
                this.background.classList.add('open');
                this.dialog.classList.add('open');
            } else {
                this.background.classList.remove('open');
                this.dialog.classList.remove('open');
            }
        }
    }

    showModal() {
        this.setAttribute('open', true);
    }

    close() {
        this.removeAttribute('open', false);
    }

    set isOpen(newValue) {
        return;
    }

    get isOpen() {
        return this._open;
    }

}

DialogComponent.prototype.currentDocument = document.currentScript.ownerDocument;
customElements.define('dialog-component', DialogComponent);