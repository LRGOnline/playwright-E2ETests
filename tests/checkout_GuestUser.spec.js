// tests/hover.spec.js (ES6 module)
import { test, expect } from '@playwright/test';
import WomenPage from '../pages/WomenPage.js';
import HomePage from '../pages/HomePage.js';
import ProductPage from '../pages/ProductPage.js';

test('Homepage to checkout journey', async ({ page }) => {
  const womenPage = new WomenPage(page);
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  // Go to the website
  await page.goto('https://www.secretsales.com/');

  //Close cookie banner - button[class*='cookieDisclaimer']
  await homePage.closeCookieDisclaimer();

  // Hover over the "Women" link
  await homePage.hoverOverWomen();

  // Click on the correct "Shop All" link
  await homePage.clickShopAll();

  // wait for Women > Shopp all to load
  await womenPage.waitForPageToLoad();

  // Selekt product and go to product page
  await womenPage.goToProductPage();

  // On product page select size
  await productPage.waitForPageToLoad();

  await productPage.selectSize('size10');
  
  //Click Add to basket
  await productPage.addProductToBasket();
  
  // Click on bascket icon
  //await page.click(productPage.basketIcon);

  // Wait for counter on mini cart to change
  await productPage.goToCheckout();
  
  // Wait for Checkout mini cart and click Checkout button
  const minicartCheckoutButton = page.locator("//button[text()='Checkout']");
  await expect(minicartCheckoutButton).toBeEnabled();
  await minicartCheckoutButton.click();   

  // Click new to Secretsales button and wait for Guest checkout button [aria-label="Sign Up"]
  const newToSecretSales = page.locator('[aria-label="Sign Up"]');
  await expect(newToSecretSales).toBeEnabled();
  await newToSecretSales.click();   

  // Click on continue as Guest button a.guest-checkout-button
  const guestCheckoutButton = page.locator('a.guest-checkout-button');
  await expect(guestCheckoutButton).toBeEnabled();
  await guestCheckoutButton.click();   

  // Wait for Order Details page

  // Enter Order Details 
  // Email
  const orderDetailsEmail = page.locator('#email');
  await expect(orderDetailsEmail).toBeEnabled();
  await orderDetailsEmail.fill('test@example.com');  
  // First name
  const orderDetailsFirstName = page.locator('#firstname');
  await expect(orderDetailsFirstName).toBeEnabled();
  await orderDetailsFirstName.fill('Boyan');  
  // Last name
  const orderDetailsLastName = page.locator('#lastname');
  await expect(orderDetailsLastName).toBeEnabled();
  await orderDetailsLastName.fill('Bogdanov');  
  // Click Enter address manually
  const orderDetailsManuallyEnterButton = page.locator('[data-test-id="enter-address-manually"]');
  await expect(orderDetailsManuallyEnterButton).toBeEnabled();
  await orderDetailsManuallyEnterButton.click();  
  // Street
  const orderDetailsStreet = page.locator('#street1');
  await expect(orderDetailsStreet).toBeEnabled();
  await orderDetailsStreet.fill('1 Test Street');  
  // City
  const orderDetailsCity = page.locator('#city');
  await expect(orderDetailsCity).toBeEnabled();
  await orderDetailsCity.fill('London');
  // Post Code 
  const orderDetailsPostCode = page.locator('#postcode');
  await expect(orderDetailsPostCode).toBeEnabled();
  await orderDetailsPostCode.fill('LS1 0AB');  
  const orderDetailsTelephone = page.locator('#telephone');
  await expect(orderDetailsTelephone).toBeEnabled();
  await orderDetailsTelephone.fill('07777777777'); 

  // Click Proceed to payment [data-test-id="proceed-to-payment"]
  const orderDetailsProceedTopayment = page.locator('[data-test-id="proceed-to-payment"]');
  await expect(orderDetailsProceedTopayment).toBeEnabled();
  await orderDetailsProceedTopayment.scrollIntoViewIfNeeded();
  await orderDetailsProceedTopayment.click(); 

  // Wait for Payment page to appear 

  const paymentDetailsStripePaymentlabel = page.locator("[for='stripe_payments']");
  //await expect(paymentDetailsStripePaymentlabel).toBeEnabled();
  await paymentDetailsStripePaymentlabel.click(); 
  // Enter Iframe
  const stripeFrameHandle = page.frameLocator('#payment-element iframe');
  // Enter payment details
  const cardNumberInput = stripeFrameHandle.locator('#Field-numberInput');
  await cardNumberInput.fill('4000000000000000'); 
  const cardExpiryDateInput = stripeFrameHandle.locator('#Field-expiryInput');
  await cardExpiryDateInput.fill('0127'); 
  const cardCVCInput = stripeFrameHandle.locator('#Field-cvcInput');
  await cardCVCInput.fill('123'); 

  // DEBUG Explicit wait to see what is on the page
  //await page.wait(5000);

  // Assert that the URL is correct
  // Other Assertions... 


  
});

