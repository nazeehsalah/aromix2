import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { ConfigProvider } from '../config/config';


@Injectable()
export class UserAddressProvider {

  constructor(
    public config: ConfigProvider,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) {
    console.log('Hello UserAddressProvider Provider');
  }
  public lat: any;
  public long: any;
  getCordinates() {
    return new Promise(resolve => {
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        console.log(resp);
        resolve({ "lat": resp.coords.latitude, "long": resp.coords.longitude });
      }).catch((error) => {
        console.log('Error getting location', error);
        resolve("error");
      });
    });
  }

  getAddress() {
    return new Promise(resolve => {
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.getCordinates().then((value: any) => {

        this.nativeGeocoder.reverseGeocode(value.lat, value.long, options)
          .then((result: NativeGeocoderReverseResult[]) => {
            resolve(result[0]);
            console.log(result[0]);
          })
          .catch((error: any) => {
            console.log(error);
            resolve("error");
          });

      });
    });
  }

}
