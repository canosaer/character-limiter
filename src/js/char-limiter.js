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
        limit: 100,
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
        if(!options.warningAt){
            this.options.warningAt = Math.ceil(this.options.limit*0.1)
            if (this.options.warningAt < 5) this.options.warningAt = 5
        }
        
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
        const charUsagePs = document.querySelectorAll(`.char-usage`)
        const allINPUTS = document.querySelectorAll(`[data-limit]`)
        

        for(let i=0;i<allINPUTS.length;i++){
            charUsageSpans[i].textContent = allINPUTS[i].dataset.limit
        }

        this.handleKeyUp = (evt) => {
            
            let defaultMessageColor = ``
            let defaultInputColor = ``
            let j=0
            const curValue = this.element.value
            const curCount = curValue.length
            for(let i=0;i<allINPUTS.length;i++){
                if (allINPUTS[i] === this.element) j=i
            }
            let charsLeft = this.options.limit - curCount
            charUsageSpans[j].textContent = charsLeft
            
            if (charsLeft <= this.options.warningAt) {
                if (charUsagePs[j].style.color != this.options.messageColor){
                    defaultMessageColor = charUsagePs[j].style.color
                    charUsagePs[j].style.color = this.options.messageColor
                }
                if(charsLeft <= 0){
                    if (allINPUTS[j].style.backgroundColor != this.options.messageColor){
                        defaultInputColor = allINPUTS[j].style.backgroundColor
                        allINPUTS[j].style.backgroundColor = this.options.messageColor
                    }
                    allINPUTS[j].value = this.element.value.substring(0,this.options.limit)
                    charUsageSpans[j].textContent = 0
                }
                else{
                    if (allINPUTS[j].style.backgroundColor != defaultInputColor){
                        allINPUTS[j].style.backgroundColor = defaultInputColor
                    }
                }
            }
            else{ 
                if (charUsagePs[j].style.color != defaultMessageColor){
                    charUsagePs[j].style.color = defaultMessageColor
                }
            }
        }

        this.element.addEventListener(`keyup`, this.handleKeyUp)

       
    }
}