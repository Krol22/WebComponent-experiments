export class AuthComponent extends HTMLElement {

    constructor() {
        super();

        this.template = `
            <style>
                .link {
                    display: inline-block;
                    text-decoration: underline;
                    margin: 10px;
                    cursor: pointer;
                }

                .btn {
                    display: inline-block;
                    border: 1px solid black;
                    cursor: pointer;
                }
            </style>
            <div class="link" id="sign-up-button">Sign up</div>
            <div class="link" id="sign-in-button">Sign in</div>
            <sign-up-component></sign-up-component>
            <sign-in-component></sign-in-component>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.signInDialog = this.querySelector('sign-in-component');
        this.signUpDialog = this.querySelector('sign-up-component');

        this.signUpBtn = this.querySelector('#sign-up-button');
        this.signUpBtn.addEventListener('click', () => {
            this.signUpDialog.showModal();
        });

        this.signInBtn = this.querySelector('#sign-in-button');
        this.signInBtn.addEventListener('click', () => {
            this.signInDialog.showModal();
        });
    }
}