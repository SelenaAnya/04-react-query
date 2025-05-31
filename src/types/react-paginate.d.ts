declare module 'react-paginate' {
    import { Component } from 'react';
  
    export interface ReactPaginateProps {
      pageCount: number;
      pageRangeDisplayed?: number;
      marginPagesDisplayed?: number;
      previousLabel?: React.ReactNode;
      nextLabel?: React.ReactNode;
      breakLabel?: React.ReactNode;
      onPageChange?: (selectedItem: { selected: number }) => void;
      initialPage?: number;
      forcePage?: number;
      disableInitialCallback?: boolean;
      containerClassName?: string;
      pageClassName?: string;
      pageLinkClassName?: string;
      activeClassName?: string;
      activeLinkClassName?: string;
      previousClassName?: string;
      nextClassName?: string;
      previousLinkClassName?: string;
      nextLinkClassName?: string;
      disabledClassName?: string;
      breakClassName?: string;
      breakLinkClassName?: string;
      renderOnZeroPageCount?: () => React.ReactNode;
      hrefBuilder?: (pageIndex: number) => string;
    }
  
    export default class ReactPaginate extends Component<ReactPaginateProps> {}
  }