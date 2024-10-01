// pages/WomenPage.js (ES6 module)
import { expect } from '@playwright/test';
export default class ProductPage {
    constructor(page) {
      this.page = page;
      this.sizeMenu = 'select#size';
      this.sizeMenuOption = 'select#size option'
      this.addToBasket= "[data-test-id='product-add-to-basket']";  // data-test-id
      this.basketIcon =  "[data-test-id='desktop-mini-cart']";  // data-test-id
      this.basketCounter = "[data-test-id='desktop-mini-cart'] [data-test-id='desktop-mini-cart-counter']";  // data-test-id
      this.miniCartCheckoutbutton = "//button[text()='Checkout']"; 

      // Animated checkout cart

      this.availableSizes = {
        size8: "8 UK",
        size10: "10 UK",
        size12: "12 UK",
      };
    }

   async waitForPageToLoad (){
       // Assert the heading is visible, and Playwright will automatically wait for it
       const sizemenu = this.page.locator(this.sizeMenu);
       await expect(sizemenu).toBeVisible();
   }

    // select size
    async selectSize(sizeKey) {

        // Get the size value from the object based on the sizeKey
    const sizeValue = this.availableSizes[sizeKey];

    if (sizeValue) {
      // Wait for the size dropdown to be visible
      await expect(this.page.locator(this.sizeMenu)).toBeVisible();
      await this.page.click(this.sizeMenu);

      await this.page.selectOption(this.sizeMenu, { label: sizeValue });
    } else {
      throw new Error(`Size key "${sizeKey}" is not valid`);
    }
        
    }

    // add to basket
    async addProductToBasket() {
    // Click the "Add to Basket" button (Playwright will automatically wait for it to be visible)
    await this.page.click(this.addToBasket);
    // Wait for the basket counter to change from 0 to a non-zero value
    const basketCounter = this.page.locator(this.basketCounter);
    await expect(basketCounter).toHaveText(/^[1-9]\d*$/);  // Expect counter to
    
    }

    // select size
    async goToCheckout() {

    await expect(this.page.locator(this.basketIcon)).toBeVisible(); 
    await this.page.click(this.basketIcon);

    }
   
  };