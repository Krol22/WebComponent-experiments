export class SignUpComponent extends HTMLElement {

    constructor() {
        super();
        
        this.template = `
            <style>
                .dialog-footer {
                    margin: 10px 0;
                    display: flex;
                    justify-content: space-around;
                }

                div[slot="dialog-content"] {
                    padding: 2px 10px;
                }

                dialog-component {
                    --dialog-width: 350px;
                }

                h2 {
                    text-align: center;
                }
            </style>
            <dialog-component>
                <div slot="dialog-content">
                    <h2>Sign up</h2>
                    <div class="form-input">
                        <label for="login">Email: </label>
                        <input type="text" name="login"/>
                    </div>
                    <div class="form-input">
                        <label for="login">Password: </label>
                        <input type="password" name="password"/>
                    </div>
                    <div class="form-input">
                        <label for="login">Repeat: </label>
                        <input type="password" name="password"/>
                    </div>

                    <div class="dialog-footer">
                        <div id="sign-up-register" class="btn">Login</div>
                        <div id="sign-up-cancel" class="btn">Cancel</div>
                    </div>
                </div>
            </dialog-component>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.dialog = this.querySelector('dialog-component');
        this.cancelBtn = this.querySelector('#sign-up-cancel');

        this.cancelBtn.addEventListener('click', () => {
            this.dialog.close();
        });
    }

    showModal() {
        this.dialog.showModal();
    }
}