class RWC_Checkbox extends HTMLElement {
    static formAssociated = true

    static get observedAttributes() {
        return [
            'checkbox_size', 'checkbox_color', 'is_indeterminate', 'required', 'title'
        ]        
    }

    get value()             { return this.value_                       }
    set value(newValue)     { this.value_ = newValue                   }
    get form()              { return this.internals_.form              }
    get name()              { return this.getAttribute('name')         }
    get type()              { return this.localName                    }
    get validity()          { return this.internals_.validity          }
    get validationMessage() { return this.internals_.validationMessage }
    get willValidate()      { return this.internals_.willValidate      }

    checkValidity()  { return this.internals_.checkValidity()  }
    reportValidity() { return this.internals_.reportValidity() }

    setFormValue() {

    }

    /**
     * This is called when the 'disabled' attribute of the element or of an ancestor <fieldset> is
     * updated
     * @param {Boolean} disabled 
     */
     formDisabledCallback(disabled) {
        if (disabled) {
            
        } 
        else {
            
        }
    }

    /**
     * This is called when the form is reset
     */
    formResetCallback() {

    }

    constructor() {
        super()
        this.internals_ = this.attachInternals()
        this.value_ = null
        this.init()
    }

    init() {
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))  

        this.Style = this.shadowRoot.querySelector('style')
        this.Input = this.shadowRoot.querySelector('input')
        this.SpanWrapper = this.shadowRoot.querySelector('span.wrapper')
        this.SpanLabel = this.shadowRoot.querySelector('span.label')
        this.SvgSquare = this.shadowRoot.querySelector('svg.square')
        this.SvgChecked = this.shadowRoot.querySelector('svg.checked')
        this.SvgIndeterminate = this.shadowRoot.querySelector('svg.indeterminate')
    }

    getTemplate() {
        this.defaultCheckboxSize = ''
        this.defaultCheckboxColor = ''
        this.css = ``

        const template = document.createElement('template')
        template.innerHTML = `
            <link rel="stylesheet" href="style.min.css">
            <style></style>

            <label class="checkbox">
                <span class="wrapper">
                    <input type="checkbox">
                    <svg class="square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM384 80H64C55.16 80 48 87.16 48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80z"/></svg>
                    <svg class="checked hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM339.8 211.8C350.7 200.9 350.7 183.1 339.8 172.2C328.9 161.3 311.1 161.3 300.2 172.2L192 280.4L147.8 236.2C136.9 225.3 119.1 225.3 108.2 236.2C97.27 247.1 97.27 264.9 108.2 275.8L172.2 339.8C183.1 350.7 200.9 350.7 211.8 339.8L339.8 211.8z"/></svg>
                    <svg class="indeterminate hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM136 232C122.7 232 112 242.7 112 256C112 269.3 122.7 280 136 280H312C325.3 280 336 269.3 336 256C336 242.7 325.3 232 312 232H136z"/></svg>
                </span>
                <span class="label">Label...</span>
            </label>
        `

        return template
    }
    
    connectedCallback() {
        const checkbox = this

        this.Input.addEventListener('focus', () => this.SpanWrapper.classList.add('focus'))
        this.Input.addEventListener('blur', () => this.SpanWrapper.classList.remove('focus'))
        this.Input.addEventListener('change', function() {
            if (this.checked) {
                checkbox.SvgSquare.classList.add('hidden')
                checkbox.SvgChecked.classList.remove('hidden')
            }
            else {
                checkbox.SvgSquare.classList.remove('hidden')
                checkbox.SvgChecked.classList.add('hidden')
            }
        })
    }

    attributeChangedCallback() {
        
    }
}

window.customElements.define('rwc-checkbox', RWC_Checkbox)