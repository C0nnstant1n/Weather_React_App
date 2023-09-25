import axios from "axios";
import { key } from "../../../../secrets";

interface GeoObject {
  GeoObject: {
    metaDataProperty: {
      GeocoderMetaData: {
        precision: string;
        text: string;
        kind: string;
        Address: {
          country_code: string;
          formatted: string;
          Components: {
            kind: string;
            name: string;
          }[];
        };
        AddressDetails: {
          Country: {
            AddressLine: string;
            CountryNameCode: string;
            CountryName: string;
            AdministrativeArea: {
              AdministrativeAreaName: string;
            };
          };
        };
      };
    };
    name: string;
    description: string;
    boundedBy: {
      Envelope: {
        lowerCorner: string;
        upperCorner: string;
      };
    };
    uri: string;
    Point: {
      pos: string;
    };
  };
}

async function YandexMapApi(props: string) {
  const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${key}&geocode=${props}&format=json`;

  const requst = await axios.get(url).then((request) => {
    return request.data.response.GeoObjectCollection.featureMember;
  });

  const result = requst.map((dat: GeoObject) => {
    return dat.GeoObject.Point.pos;
  });

  return result[0];
}

export default YandexMapApi;
