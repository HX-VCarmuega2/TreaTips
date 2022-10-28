export function addBtnPaginationClass (currentPage, el){
    console.log(currentPage,el)
    if(currentPage === el){
        return 'pagination__btn-active'
    }
    if ((currentPage<7 && el<7) || (currentPage>6 && el>6)){
      return 'pagination__btn'
    }
    else return 'hide'
  }