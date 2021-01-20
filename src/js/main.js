const allInputFields = document.querySelectorAll(`[data-limit]`)

allInputFields.forEach((element) => {
    const charLimited1 = new CharLimiter(element, element.dataset)
})