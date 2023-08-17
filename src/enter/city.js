
import { loadFBX } from '../utils'

export class City {
  constructor(scene){
    this.scene = scene;
    this.loadCity();
  }

  loadCity(){
    loadFBX('/src/model/beijing.fbx').then(object => {
      this.scene.add(object)
    })
  }


  start(){}
}