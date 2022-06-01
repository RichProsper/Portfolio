class RWC_ToTopButton extends HTMLElement {
    static get observedAttributes() {
        return [
            'button_size', 'button_color', 'button_hover_color', 'chevron_color',
            'chevron_hover_color', 'button_placement'
        ]
    }

    constructor() {
        super()
        this.init()
    }

    init() {
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))

        this.ToTopButton = this.shadowRoot.querySelector('button')
        this.Style = this.shadowRoot.querySelector('style')
    }

    getTemplate() {
        this.defaultButtonSize = '5rem'
        this.defaultButtonColor = 'hsla(var(--deep-pink-hue), 100%, 48%, .8)'
        this.defaultButtonHoverColor = 'hsl(var(--deep-pink-hue), 100%, 48%)'
        this.defaultChevronColor = 'hsl(0, 0%, 80%)'
        this.defaultChevronHoverColor = 'hsl(0, 0%, 100%)'
        this.defaultButtonPlacement = 'bottom-right'
        this.css = `
            *,*::before,*::after{margin:0;padding:0}.totopbutton{--button-size: [[button_size]];--deep-pink-hue: 339;--button-color: [[button_color]];--button-hover-color: [[button_hover_color]];--chevron-color: [[chevron_color]];--chevron-hover-color: [[chevron_hover_color]];-webkit-box-sizing:border-box;box-sizing:border-box;position:fixed;[[button_placement]]display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:1em;height:1em;-webkit-box-shadow:0 0.06em 0.1em -0.02em rgba(0,0,0,0.22),0 0.12em 0.2em 0 rgba(0,0,0,0.34),0 0.02em 0.36em 0 rgba(0,0,0,0.32);box-shadow:0 0.06em 0.1em -0.02em rgba(0,0,0,0.22),0 0.12em 0.2em 0 rgba(0,0,0,0.34),0 0.02em 0.36em 0 rgba(0,0,0,0.32);background-color:var(--button-color);border-radius:50%;font-size:var(--button-size);opacity:0;-webkit-transform:scale(0);transform:scale(0);visibility:hidden;pointer-events:none;cursor:pointer;border:none;z-index:9999;-webkit-transition:.25s ease-out;transition:.25s ease-out}.totopbutton:hover{background-color:var(--button-hover-color)}.totopbutton:hover svg{fill:var(--chevron-hover-color)}.totopbutton:focus{outline-offset:.1em;outline:-webkit-focus-ring-color auto 1px}.totopbutton.sticky{opacity:1;-webkit-transform:scale(1);transform:scale(1);visibility:visible;pointer-events:unset}.totopbutton *,.totopbutton *::before,.totopbutton *::after{-webkit-box-sizing:inherit;box-sizing:inherit}.totopbutton svg{width:.26em;fill:var(--chevron-color)}
        `

        const template = document.createElement('template')
        template.innerHTML = `
            <style></style>

            <button type="button" class="totopbutton" title="Back to Top">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M416 352c-8.188 0-16.38-3.125-22.62-9.375L224 173.3l-169.4 169.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25C432.4 348.9 424.2 352 416 352z"/></svg>
            </button>
        `

        return template
    }

    updateStyle() {
        const btnPlacement = this.getAttribute('button_placement') || this.defaultButtonPlacement
        let css = this.css.replace('[[button_size]]', this.getAttribute('button_size') || this.defaultButtonSize)
        css = css.replace('[[button_color]]', this.getAttribute('button_color') || this.defaultButtonColor)
        css = css.replace('[[button_hover_color]]', this.getAttribute('button_hover_color') || this.defaultButtonHoverColor)
        css = css.replace('[[chevron_color]]', this.getAttribute('chevron_color') || this.defaultChevronColor)
        css = css.replace('[[chevron_hover_color]]', this.getAttribute('chevron_hover_color') || this.defaultChevronHoverColor)

        switch (true) {
            case (btnPlacement === 'top-left' || btnPlacement === 'top left'): {
                this.Style.innerHTML = css.replace('[[button_placement]]', 'top:.6em;left:.6em;')
                break
            }
            case (btnPlacement === 'top-right' || btnPlacement === 'top right'): {
                this.Style.innerHTML = css.replace('[[button_placement]]', 'top:.6em;right:.6em;')
                break
            }
            case (btnPlacement === 'bottom-left' || btnPlacement === 'bottom left'): {
                this.Style.innerHTML = css.replace('[[button_placement]]', 'bottom:.6em;left:.6em;')
                break
            }
            default: {
                this.Style.innerHTML = css.replace('[[button_placement]]', 'bottom:.6em;right:.6em;')
                break
            }
        }
    }

    connectedCallback() {
        this.updateStyle()
        
        window.addEventListener('scroll', () => {
            this.ToTopButton.classList.toggle('sticky', window.scrollY > 100)
        })

        if (window.scrollY > 100) this.ToTopButton.classList.add('sticky')

        this.ToTopButton.addEventListener('click', () => {
            window.scroll(0, 0)
        })
    }

    // This life cycle hook is run before connectedCallback()
    attributeChangedCallback() {
        this.updateStyle()
    }
}

window.customElements.define('rwc-totopbutton', RWC_ToTopButton)