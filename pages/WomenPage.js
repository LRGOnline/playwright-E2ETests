// pages/WomenPage.js (ES6 module)
import { expect } from '@playwright/test';
export default class WomenPage {
    constructor(page) {
      this.page = page;
      this.womenHeading = '//h1[contains(text(),"Clothing")]';
      this.secondProduct = '.fredhopper-item-list-root a:nth-child(2)';
      this.thirdProduct = '.fredhopper-item-list-root a:nth-child(3)';
    }
  
    async waitForPageToLoad() {
        // Assert the heading is visible, and Playwright will automatically wait for it
        const heading = this.page.locator(this.womenHeading);
        await expect(heading).toBeVisible();
      }
  //
  async goToProductPage(productNumber = 2) {
    let productSelector;

    //await this.page.pause();
    // Select product based on the productNumber parameter
    if (productNumber === 2) {
      productSelector = this.secondProduct;
    } else if (productNumber === 3) {
      productSelector = this.thirdProduct;
    } else {
      throw new Error(`Product number ${productNumber} is not defined.`);
    }
    
    // Wait for the product link to be visible and clickable (enabled)
   // await this.page.waitForSelector(productSelector, { state: 'visible' });
    await expect(this.page.locator(productSelector)).toBeVisible();

    // Click the product link
    await this.page.click(productSelector);
    }

  };