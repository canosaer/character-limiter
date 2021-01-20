/**
 * CharLimiter will be responsible for adding and enforcing
 * character count limits on input fields
 * 
 *  Should be called on a single input field rather than a generic
 *  selector or group of fields
 * 
 */

class CharLimiter{

    element = null
    options = {}
    DEFAULTS = {
        limits: 10,
        messageColor: `red`
    }

    /**
     *  Parameters: 
     *  - element: DOM element to impose a limit on
     *  - options: object of optional parameters
     *    - limit: numeric limit
     *    - messageColor: color of the X chars left
     * 
     */
    constructor(element, options = {}){
        this.element = element
        this.options = {
            ...this.DEFAULTS,
            ...options
        }
        this.options.limit = parseInt(this.options.limit)

        console.log(`CharLimiter()`, element, options, this.options)

        this.setup()
    }

    setup() {
        // add a new message field to the DOM
        const message = document.createElement(`span`)
        message.classList.add(`message`)
        message.textContent = `${this.options.limit} chars left`
        this.element.parentNode.appendChild(message)

        // setup an event listener on the input element
        this.element.addEventListener(`keyup`, this.handleKeyUp)

        handleKeyUp = (evt) => {
            // console.log(`keyup`, evt, this)

            const curValue = this.element.value
            const curCount = curValue.length
            console.length()
        }
    }
}