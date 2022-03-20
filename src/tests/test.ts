

const tag_name = (tag: string) => {
    const correctedTag = tag.toLowerCase()
    .trim()
    .replace(/[\u0300-\u036f]/g, "")

    return correctedTag
}

console.log(tag_name("camiseta branca"))
console.log(tag_name("Camisa Cor de Rosa"))
console.log(tag_name("Raiê"))


