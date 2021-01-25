const allInputFields = document.querySelectorAll(`[data-limit]`)

allInputFields.forEach((element) => {
    const charLimited = new CharLimiter(element, element.dataset)
})