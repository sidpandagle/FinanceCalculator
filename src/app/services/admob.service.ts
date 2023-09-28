import { Injectable } from '@angular/core';
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, BannerAdPluginEvents, AdMobBannerSize, AdmobConsentStatus, AdmobConsentDebugGeography } from '@capacitor-community/admob';


@Injectable({
  providedIn: 'root'
})
export class AdmobService {

  constructor() {
  }

  async initialize(): Promise<void> {
    const { status } = await AdMob.trackingAuthorizationStatus();
    if (status === 'notDetermined') {
      /**
       * If you want to explain TrackingAuthorization before showing the iOS dialog,
       * you can show the modal here.
       * ex)
       * const modal = await this.modalCtrl.create({
       *   component: RequestTrackingPage,
       * });
       * await modal.present();
       * await modal.onDidDismiss();  // Wait for close modal
       **/
      console.log(status)
    }

    AdMob.initialize({
      // testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
      testingDevices: ['860041058408652'],
      initializeForTesting: true,
    }).then(() => {
      this.banner();
    });
  }
  async banner(): Promise<void> {
    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
      // Subscribe Banner Event Listener
      console.log('Banner Event Listener')
    });

    AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
      // Subscribe Change Banner Size
      console.log('Change Banner Size')
    });

    const options: BannerAdOptions = {
      // adId: 'ca-app-pub-3940256099942544/6300978111', //test
      adId: 'ca-app-pub-3063424247247330/3001903635', //prod
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true,
    };
    AdMob.showBanner(options);
  }


  async showConsent() {
    const consentInfo = await AdMob.requestConsentInfo(
      {
        debugGeography: AdmobConsentDebugGeography.EEA,
        testDeviceIdentifiers: ['860041058408652']
      }
    );

    if (consentInfo.isConsentFormAvailable && consentInfo.status === AdmobConsentStatus.REQUIRED) {
      const { status } = await AdMob.showConsentForm();
    }
  }
}

