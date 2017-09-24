import {Component, Element, EventEmitter, Event, Listen, Prop} from '@stencil/core';

@Component({
    tag: 'st-login',
    styleUrl: 'st-login.scss'
})
export class Login {
    @Prop() forgotPasswordUrl: string;
    @Event() loginShouldOccur: EventEmitter;
    @Element() host: HTMLElement;

    login() {
        let form = this.host.querySelector('form');
        if (form.reportValidity()) {
            let inputs = this.host.querySelectorAll('input');
            this.loginShouldOccur.emit({ username: inputs[0].value, password: inputs[1].value });
        }
    }

    @Listen('keydown.enter')
    handleEnter() {
        this.login();
    }

    render() {
        return (
            <form class="login-form">
              <div class="login-container">
                <div class="field-wrap">
                  <label class="login-username">Username <span class="req">*</span>:</label>
                  <input name="username" required />
                </div>
                <div class="field-wrap">
                  <label class="login-password">Password <span class="req">*</span>:</label>
                  <input type="password" name="password" required />
                </div>
                  {this.forgotPasswordUrl ?
                      <p class="forgot">
                        <stencil-route-link url={this.forgotPasswordUrl}>Forgot Password?</stencil-route-link>
                      </p> : ''}
                <button type="button" onClick={() => { this.login(); }}>Login</button>
              </div>
            </form>
        );
    }
}