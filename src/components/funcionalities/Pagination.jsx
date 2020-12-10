import React from 'react';
import { Button } from 'react-bootstrap';
import { range } from 'lodash';

function Pagination ({ page, setPage, pages }) {
    
    return (

        <div className="pagination">
        {
            page > 0 &&
                <Button 
                    variant="link"
                    onClick={() => setPage(page-1)}
                > &#171; </Button>
        }
        {
            range(0, pages).map((n,i) => (
                n === page
                    ? false
                    : <Button
                          variant="link"
                          key={`btn-page-${i}`}
                          onClick={() => setPage(n)}
                      >{n}</Button>
            ))
        }
        {
            page < pages - 1
                ? <Button
                    variant="link"
                    onClick={() => setPage(page+1)}
                  >&raquo; </Button>
                : false
        }
        </div>

    );
}

export default Pagination;