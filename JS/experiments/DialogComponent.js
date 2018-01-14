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
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        if(attributeName === 'open') {
            if(newValue === 'true') {
                this.style.display = 'block';
            } else {
                this.style.display = 'none';
            }
        }
    }

    showModal() {
        this.style.display = 'block';
        this.setAttribute('open', true);
    }

    close() {
        this.style.display = 'none';
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