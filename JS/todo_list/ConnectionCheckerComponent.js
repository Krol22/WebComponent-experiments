export class ConnectionCheckerComponent extends HTMLElement {

    constructor() {
        super();
        this.tries = 0;
        this.template = `
            <style>
                :host {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    position: fixed;
                    top: 0;
                    left: 0;
                    border: 1px solid black;

                    transition: top 2s ease-in-out;
                }

                .status-text {
                    padding: 10px
                }

                .btn {
                    margin: 5px 10px;
                    padding: 5px;
                    display: inline-block;
                    cursor: pointer;
                    border: 1px solid black;
                }
            </style>

            <span class="status-text" id="status"></span>
            <div class="btn" id="check-btn"> Reconnect </div>
        `;
    }

    connectedCallback() {
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.innerHTML = this.template;

        this.statusSpan = this._shadowRoot.querySelector('#status');
        this.checkBtn = this._shadowRoot.querySelector('#check-btn')

        this.checkForConnection = new CustomEvent('checkConnection', {
            bubbles: true,
            cancelable: false
        });

        this.setAsOnline();

        this.addEventListener('checkConnection', () => {
            this.checkIfIsOnline();

            clearInterval(onlineCheckerInterval);
            this.setCheckerInterval();
        });

        this.setCheckerInterval();
    }

    setCheckerInterval() {
        this.onlineCheckerInterval = setInterval(this.checkIfIsOnline.bind(this), 30000);
    }

    checkIfIsOnline() {
        if(window.navigator.onLine) {
            this.tries = 0;
            this.setAsOnline();
        } else if(this.tries !== 5){
            this.tries++;
            this.setAsOffline();
        } else {
            this.setAsOffline();
        }
    }

    setAsOnline() {
        this.style.borderColor = 'green';
        this.style.color = 'green';
        this.style.backgroundColor = 'lightgreen';
        this.statusSpan.innerHTML = 'Application status: Online';
        this.checkBtn.style.display = 'none';
        this.style.top = '-100px';
    }

    setAsOffline() {
        this.style.borderColor = 'red';
        this.style.color = 'red';
        this.style.backgroundColor = 'lightpink';
        this.statusSpan.innerHTML = 'Application status: Offline';
        this.checkBtn.style.display = 'inline-block';
        this.style.top = '0px';
    }

    disconnectedCallback() {
    }
}