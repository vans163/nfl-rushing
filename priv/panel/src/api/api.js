import { setGlobalState } from '../state/state';

export const apiLoadTable = async () => {
  var response = await fetch("http://127.0.0.1:8080/rushing.json")
  var json = await response.json()
  json = JSON.parse(json)
  setGlobalState('local', v => { return {...v, rushing: json} })
}
