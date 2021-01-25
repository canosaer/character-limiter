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
        limit: 10,
        messageColor: `red`,
        warningAt: 10
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

        this.setup()
    }

    setup() {
        // add a new message field to the DOM
        // const message = document.createElement(`span`)
        // message.classList.add(`message`)
        // message.textContent = `${this.options.limit} chars left`
        // this.element.parentNode.appendChild(message)

        // setup an event listener on the input element

        const charUsageSpans = document.querySelectorAll(`.char-usage__count`)
        const allINPUTS = document.querySelectorAll(`[data-limit]`)

        let j=0

        for(let i=0;i<allINPUTS.length;i++){
            charUsageSpans[i].textContent = allINPUTS[i].dataset.limit
        }

        this.handleKeyUp = (evt) => {
            const curValue = this.element.value
            const curCount = curValue.length
            for(let i=0;i<allINPUTS.length;i++){
                if (allINPUTS[i] === this.element) {j=i}
            }
            charUsageSpans[j].textContent = this.options.limit - curCount;
        }

        this.element.addEventListener(`keyup`, this.handleKeyUp)

       
    }
}