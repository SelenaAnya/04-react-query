import React from "react";
import style from "./Loader.module.css";

const Loader: React.FC = () => {
    return (
        <p className={style.text}> Loading movies, please wait...</p>
    );
};

export default Loader;