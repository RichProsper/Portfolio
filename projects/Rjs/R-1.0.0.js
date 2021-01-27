class RDOM {
    /**
     * @param {HTMLElement | NodeList} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef
        this.isValidElemRef()
    }

    /**
     * Checks whether or not the elemRef is valid.
     * This is incase a direct RDOM object was created, e.g. new RDOM(...)
     */
    isValidElemRef = () => {
        if (
            this.elemRef instanceof HTMLElement ||
            this.elemRef instanceof HTMLCollection ||
            this.elemRef instanceof NodeList
        ) return true
        else {
            console.error('Not an HTML Element / HTML Collection / Node List...')
            return false
        }
    }

    /**
     * Applies the styles to the elemRef
     * @param {Object} stylesObj
     */
    css = stylesObj => {
        if (this.isValidElemRef()) {
            if (typeof stylesObj === 'object') {
                /**
                 * @param {HTMLElement} elem 
                 * @param {Object} stylesObject 
                 */
                const applyStyles = (elem, stylesObject) => {
                    for (let style in stylesObject) elem.style[style] = stylesObject[style]
                }

                if (this.elemRef instanceof HTMLElement) applyStyles(this.elemRef, stylesObj)
                else {
                    for (let i = 0; i < this.elemRef.length; i++) {
                        applyStyles(this.elemRef[i], stylesObj)
                    }
                }
            }
            else {
                const stylesType = typeof stylesObj
                console.error(
                    'Invalid Styles provided:',
                    stylesObj,
                    `\nExpecting an object instead a(n) ${stylesType} was provided.`
                )
            }
        }

        return this
    } // func css

    /**
     * Adds 1 or more classes
     * @param {String} clsStr - Holds 1 or more classes separated by spaces
     */
    addCls = clsStr => {
        if (this.isValidElemRef()) {
            if (typeof clsStr === 'string') {
                if (clsStr) {
                    /**
                     * @param {HTMLElement} elem 
                     * @param {String} classesStr 
                     */
                    const addClass = (elem, classesStr) => {
                        const classesArr = classesStr.split(' ')
                        for (let cls of classesArr) elem.classList.add(cls)
                    }

                    if (this.elemRef instanceof HTMLElement) addClass(this.elemRef, clsStr)
                    else {
                        for (let i = 0; i < this.elemRef.length; i++) {
                            addClass(this.elemRef[i], clsStr)
                        }
                    }
                }
                else console.error('Empty classes string...')
            }
            else {
                const classesType = typeof clsStr
                console.error(
                    'Invalid class(es) provided:',
                    clsStr,
                    `\nExpecting a string instead a(n) ${classesType} was provided.`
                )
            }
        } // if

        return this
    } // func addCls

    /**
     * Removes 1 or more classes
     * @param {String} clsStr - Holds 1 or more classes separated by spaces
     */
    remCls = clsStr => {
        if (this.isValidElemRef()) {
            if (typeof clsStr === 'string') {
                if (clsStr) {
                    /**
                     * @param {HTMLElement} elem 
                     * @param {String} classesStr 
                     */
                    const remClass = (elem, classesStr) => {
                        const classesArr = classesStr.split(' ')
                        for (let cls of classesArr) elem.classList.remove(cls)
                    }

                    if (this.elemRef instanceof HTMLElement) remClass(this.elemRef, clsStr)
                    else {
                        for (let i = 0; i < this.elemRef.length; i++) {
                            remClass(this.elemRef[i], clsStr)
                        }
                    }
                }
                else console.error('Empty classes string...')
            }
            else {
                const classesType = typeof clsStr
                console.error(
                    'Invalid class(es) provided:',
                    clsStr,
                    `\nExpecting a string instead a(n) ${classesType} was provided.`
                )
            }
        } // if

        return this
    } // func remCls

    // hasCls

} // class RDOM

/**
 * Retrieves HTMLElement(s)
 * @param {HTMLElement | HTMLCollection | NodeList | String} elemRef
 * @param {Boolean} firstMatch - If true, returns the first HTMLElement found
 */
const R = (elemRef, firstMatch=false) => {
    if (elemRef instanceof HTMLElement) return new RDOM(elemRef)

    if (elemRef instanceof NodeList || elemRef instanceof HTMLCollection) {
        if (elemRef.length > 0) return new RDOM(elemRef)
        else {
            console.error('Empty HTML Collection / Node List provided...')
            return 0
        }
    }

    if (typeof elemRef === 'string') {
        if (elemRef) {
            if (elemRef[0] === '#') {
                const _elemRef = document.getElementById(elemRef.slice(1))

                if (_elemRef) return new RDOM(_elemRef)
                else {
                    console.error(`No Element found matching selector: ${elemRef}`)
                    return 0
                }
            }

            if (firstMatch) {
                const _elemRef = document.querySelector(elemRef)

                if (_elemRef) return new RDOM(_elemRef)
                else {
                    console.error(`No Element found matching selector: ${elemRef}`)
                    return 0
                }
            }
            else {
                const _elemRef = document.querySelectorAll(elemRef)

                if (_elemRef.length > 0) return new RDOM(_elemRef)
                else {
                    console.error(`No Elements found matching selector: ${elemRef}`)
                    return 0
                }
            }
        } // if
        else {
            console.error('Empty selector...')
            return 0
        }
    } // if

    console.error(
        'Invalid Element Reference:',
        elemRef,
        '\nExpecting HTMLElement, HTMLCollection, NodeList or String'
    )
    
    return 0
} // func R