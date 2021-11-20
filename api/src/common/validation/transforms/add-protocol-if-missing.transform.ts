import { isString } from '../lib/isString';

export function addProtocolIfMissing(url: any): any {
  if (isString(url) && !/^https?:\/\//.test(url + '')) {
    return 'http://' + url;
  } else {
    return url;
  }
}
