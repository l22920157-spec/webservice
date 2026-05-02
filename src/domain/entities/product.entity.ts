export class Product {
    constructor(
        public code: string,
        public description: string,
        public category: string,
        public price: number,
        public stock: number,
        public taxable: boolean
    ) {
        this.validate();
    }

    applyDiscount(percent: number) {
        if (percent < 0 || percent > 100) {
            throw new Error("Invalid discount");
        }
        this.price = this.price * (1 - percent / 100);
    }

    private validate() {
        if (!this.description) {
            throw new Error("Description is required");
        }

        if (this.price < 0) {
            throw new Error("Price must be >= 0");
        }

        if (this.stock < 0) {
            throw new Error("Stock must be >= 0");
        }
    }

}