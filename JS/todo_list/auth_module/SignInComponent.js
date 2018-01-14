import { AuthService } from '../shared/AuthService.js';

export class SignInComponent extends HTMLElement {

    constructor() {
        super();

        this.template = `
            <style>
                dialog-component {
                    --dialog-width: 350px;
                }

                h2 {
                    text-align: center;
                }
            
            </style>

            <dialog-component>
                <div slot="dialog-content">
                    <h2>Sign in</h2>
                    <div>
                        <div class="form-input">
                            <label for="login">Email: </label>
                            <input type="text" name="login" placeholder="Email"/>
                        </div>
                        <div class="form-input">
                            <label for="login">Password: </label>
                            <input type="password" name="password"/>
                        </div>

                        <div class="dialog-footer">
                            <div id="sign-in-login" class="btn">Login</div>
                            <div id="sign-in-cancel" class="btn">Cancel</div>
                        </div>
                    </div>
                </div>
            </dialog-component>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;
        this.dialog = this.querySelector('dialog-component');
        this.cancelBtn = this.querySelector('#sign-in-cancel');

        this.cancelBtn.addEventListener('click', () => {
            this.dialog.close();
        });
    }

    showModal() {
        this.dialog.showModal();
    }
}