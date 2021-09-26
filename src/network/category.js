import {request} from "./request";

export function getCateGory() {
  return request({
    url: '/category'
  })
}
