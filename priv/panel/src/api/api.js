import { setGlobalState } from '../state/state';

const baseUrl = () => {
	return `http://${process.env.REACT_APP_HOST || "127.0.0.1"}:${process.env.REACT_APP_PORT || "8080"}`
}

export const apiLoadTable = async () => {
  var response = await fetch(`${baseUrl()}/rushing.json`)
  var json = await response.json()
  json = JSON.parse(json)
  setGlobalState('local', v => { return {...v, rushing: json} })
}
