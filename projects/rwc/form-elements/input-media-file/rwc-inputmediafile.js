class RWC_InputMediaFile extends HTMLElement {
    static get observedAttributes() {
        return [
            'media_type', 'title', 'disabled', 'max_file_size', 'multiple', 'placeholder', 'required', 'accept'
        ]
    }

    constructor() {
        super()
        this.init()
    }

    init() {
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))

        this.InputMediaFile = this.shadowRoot.querySelector('.inputmediafile')
        this.Style = this.shadowRoot.querySelector('style')
    }

    getTemplate() {
        this.defaultMediaType = 'image'
        this.defaultTitle = 'Only image files allowed'
        this.defaulDisabled = false
        this.defaultMaxFileSize = 5242880 //5,242,880 bytes = 5MB
        this.defaultMultiple = false
        this.defaultPlaceholder = 'Choose a file...'
        this.defaultRequired = false
        this.defaultAccept = 'image/*'
        this.css = ``

        const template = document.createElement('template')
        template.innerHTML = `
            <link rel="stylesheet" href="rwc-inputmediafile.min.css">
            <style></style>

            <div class="inputmediafile">
                <label>
                    <input type="file">
                    <div title="[[To be removed]]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M105.4 182.6c12.5 12.49 32.76 12.5 45.25 .001L224 109.3V352c0 17.67 14.33 32 32 32c17.67 0 32-14.33 32-32V109.3l73.38 73.38c12.49 12.49 32.75 12.49 45.25-.001c12.49-12.49 12.49-32.75 0-45.25l-128-128C272.4 3.125 264.2 0 256 0S239.6 3.125 233.4 9.375L105.4 137.4C92.88 149.9 92.88 170.1 105.4 182.6zM480 352h-160c0 35.35-28.65 64-64 64s-64-28.65-64-64H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456z"/></svg>
                        <span>[[To be removed]]</span>
                    </div>
                </label>
                <button type="button" title="Click to preview selected image file(s)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z"/></svg>
                </button>
            </div>
        `

        return template
    }

    connectedCallback() {
        
    }

    // This life cycle hook is run before connectedCallback()
    attributeChangedCallback(name, oldValue, newValue) {

    }
}

window.customElements.define('rwc-inputmediafile', RWC_InputMediaFile)