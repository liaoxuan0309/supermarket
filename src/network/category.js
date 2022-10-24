
import { request_goods } from './request'



export function getCategory() {
  return request_goods({
    url: '/category'
  })
}

export function getSubcategory(maitKey) {
  return request_goods({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request_goods({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
