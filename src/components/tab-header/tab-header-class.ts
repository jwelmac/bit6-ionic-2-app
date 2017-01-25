import {TabHeaderIcon} from './';

//Class to make a complete tab header
export class TabHeader {
  constructor (
    public title: string,
    public icons: Array<TabHeaderIcon> = []
  ){
  }
}
