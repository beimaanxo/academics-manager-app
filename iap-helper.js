// Simple helper to expose a purchase function on window for Capacitor.
// Include this in your web app or inject via a script tag.
(function(){
  async function purchaseSupport() {
    try {
      if (!window.Capacitor) {
        alert('In-app purchases only available in the mobile app.');
        return;
      }
      const { InAppPurchases } = await import('@capacitor-community/in-app-purchases');
      // Replace these with your real product IDs once created in stores
      const productIdIOS = 'com.example.academicsmanager.support12';
      const productIdAndroid = 'support_12';
      const platform = (await import('@capacitor/core')).Capacitor.getPlatform();
      const targetId = platform === 'ios' ? productIdIOS : productIdAndroid;

      await InAppPurchases.connect();
      const products = await InAppPurchases.getProducts({ productIds: [targetId] });
      if (!products || !products.products || products.products.length === 0) {
        alert('Support option unavailable right now. Please try again later.');
        return;
      }
      const res = await InAppPurchases.purchase({ productId: targetId });
      if (res && res.transaction && res.transaction.receipt) {
        // TODO: optionally verify receipt on your backend
        alert('Thanks for your support!');
        await InAppPurchases.finishTransaction({ transactionId: res.transaction.transactionId });
      }
    } catch (e) {
      console.error(e);
      alert('Purchase failed or was cancelled.');
    } finally {
      try { await InAppPurchases.disconnect(); } catch (e) {}
    }
  }

  window.AcademicsManagerSupport = { purchaseSupport };
})();