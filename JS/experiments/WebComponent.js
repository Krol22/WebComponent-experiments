class WebComponent extends HTMLElement {

    static get observedAttributes() {
        return ['data'];
    }

    constructor() {
        super();
        this._data = null;
    }

    connectedCallback() {
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        var template = this.currentDocument.querySelector('#web-component');
        var instance = template.content.cloneNode(true);

        this._shadowRoot.appendChild(instance);
        this.render();
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
        this._data = newValue;
        this.render();
    }

    render() {
        if(!this._shadowRoot) {
            // return;
        }
        this._data;
        this._shadowRoot.querySelectorAll('span')[0].innerHTML = this._data;
    }

    set data(v) {
        console.log(v);
        this._data = v.value;
        this.render();
    }

    get data() {
        return this._data;
    }

}

WebComponent.prototype.currentDocument = document.currentScript.ownerDocument;
customElements.define('web-component', WebComponent);