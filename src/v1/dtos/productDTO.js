class productDTO {
  constructor(product) {
    this.id = product.id;
    this.name = product.name;
    this.price = parseFloat(product.price);
    this.image = product.image;
    this.rating = parseFloat(product.rating);
    this.color = product.color;
    this.highlights = product.highlights;
    this.description = product.description;
    this.warrantyDuration = product.warrantyDuration;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }
}

export default productDTO;
