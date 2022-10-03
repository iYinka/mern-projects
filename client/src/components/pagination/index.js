import React from "react";
import styles from "./styles/Index.module.css";

const Pagination = ({ pageSize, total, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={styles.pagination}>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        onClick={() => paginate(number)}
                        className=""
                    >
                        <a href="#!">{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
