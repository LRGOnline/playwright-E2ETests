// pages/WomenPage.js (ES6 module)
import { expect } from '@playwright/test';
export default class HomePage {
    constructor(page) {
      this.page = page;
      this.womenLink = "//a[contains(@class, 'navigation-navItemLink-1a3') and text()='Women']";
      this.AlgoliaLink = "//a[contains(@href,'c/womens/clothing/') and text()='Shop All']";
      this.FredHopperLink = "//a[contains(@href,'/clothing/shop-by/gender/gender_female,gender_unisex/') and text()='Shop All']";
      this.cookieDisclaimerOkButton = "button[class*='cookieDisclaimer']";
    }
  
    async hoverOverWomen() {
      await this.page.hover(this.womenLink);
    }
  
    async clickShopAll() {
      if (await this.page.locator(this.AlgoliaLink).isVisible()) {
        await this.page.click(this.AlgoliaLink);
      } else if (await this.page.locator(this.FredHopperLink).isVisible()) {
        await this.page.click(this.FredHopperLink);
      }
    }

    async closeCookieDisclaimer(){
        //Close cookie banner - button[class*='cookieDisclaimer']
        const button = this.page.locator(this.cookieDisclaimerOkButton);
        if (await button.isVisible()) {
          await button.click();  
        }
    }
  };