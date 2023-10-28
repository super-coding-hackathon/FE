const kakao_address_search = new window.kakao.maps.services.Places()

const search_address_by_keyword = (keyword: string, success_callback: any) => {
  kakao_address_search.keywordSearch(keyword, success_callback)
}

export default search_address_by_keyword
